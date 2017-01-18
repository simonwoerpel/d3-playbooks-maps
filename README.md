# d3-playbooks-maps

A simple wrapper around `d3` to render responsive & interactive maps, following the same idea as [`d3-playbooks`](https://github.com/simonwoerpel/d3-playbooks).

[Example for multiple choropleth maps](https://simonwoerpel.github.io/d3pb-multiple-maps-example/)

[More examples](#examples)

**FIXME** *Documentation under construction, but you should get the idea...*

## Quickstart

```javascript
d3.playbooks.choroplethMap({
  geoDataUrl: "./europe.json"
}).render();
```

### dependencies

required:
- recent version (>=4) of [`d3`](https://d3js.org/).

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
```

optional:
- [`topojson`](https://github.com/topojson/topojson) to render layers encoded on topojson.
- [`d3-scale-chromatic`](https://github.com/d3/d3-scale-chromatic) to use choropleth colorschemes.
- [`d3-playbooks-riot-components`]() to add interactive components.

```html
<script src="https://d3js.org/topojson.v2.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="./d3-playbooks-components.min.js"></script>
```

after loading these dependencies, load `d3-playbooks-maps` (no cdn yet):

```html
<script src="./d3-playbooks-maps.min.js"></script>
```

then, the namespace `d3.playbooks` is available which holds this library.

## Features

`d3-playbooks` is not a complete framework to render stuff based on `d3` (like [`nvd3`](http://nvd3.org/) or `c3`), it's just a wrapper around it to help with boilerplate code for initialization, responsiveness etc.

- easy customizable, css-agnostic
- responsive per default
- render geojson or topojson
- add additional data from csv
- update charts after first rendering

**map types:**
- `d3.playbooks.choroplethMap({...})` - colorize areas based on data
- *TODO* `d3.playbooks.symbolMap({...})` - draw features as points
- *TODO* `d3.playbooks.bivariateMap({...})` - bivariate choropleth

## Documentation

The idea behind `d3-playbooks` is to have a predefined recipes how charts are rendered. There are common tasks like getting data, computing domains, ranges, scales or rendering axes. And there are different tasks for drawing data for each chart type, like drawing bars, circles or lines.

`d3-playbooks` offers these tasks in little functions for some predefined chart types. But at every task, one could hook into it and overwrite it with another implementation. Besides the simplest chart types, `d3-playbooks` does not save you from writing *"native d3js code"*.

### Render a choropleth Map

`d3.playbooks.choroplethMap({<opts>})`

```javascript
// init
var myMap = d3.playbooks.choroplethMap({<opts>});

// render
myMap.render();

// change something
myMap.<opt>(<value>);

// update
myMap.update();

// everything is chained:
var myMap = d3.playbooks.choroplethMap({<opts>}).render();

someButton.on("click", function() {
  myMap.width(800).color("red").update();
});
```

To use additional csv data in your map, you must specify how to assign this data to the geo-layer features:

```javascript
d3.playbooks.choroplethMap({
  geoDataUrl: "./layer.geojson",
  dataUrl: "./data.csv",
  xCol: "id",    // csv-column that holds identifier for geo features, default: "id"
  yCol: "value", // csv-column that holds value for each feature, default: "value"
  // function for each feature to get identifier value
  // to match with csv id column, this is the default implementation:
  getId: function(feature) {
    return feature.properties.id;
  }
})
```

Every column and every key in `feature.properties` will assigned to the data, so you can use it later like:

```javascript
g.selectAll(".label").data(M.data).enter()  // see `drawExtra` below
  .append("div")
  .attr("class", "label")
  .text(d => d.value + " " + d.another_csv_column)
```

### drawExtra

One handy setting during initialization (or other defaults, see below) is the property `drawExtra` to (obviously) draw some extra stuff. It gets the [complete (internal) map object](https://github.com/simonwoerpel/d3-playbooks-maps/blob/master/src/map.js#L8) as argument, as a convenience we could name it `M`.

**Example: Add some labels**

```javascript
d3.playbooks.choroplethMap({
  // ...
  drawExtra: M => {
    const svg = M.g      // the svg group where the actual stuff is already drawed
    const data = M.data  // the prepared data (see above)
    // draw only labels for cities that are big:
    const labels = data.filter(d => d.population > 200000).map(d => {
      // get center point for each label
      const [x, y] = M.path.centroid(d)  // `path` = the geoPath from M, default: `d3.geoPath()`
      d.x = x
      d.y = y
      return d
    })
    // add some labels
    svg.selectAll('.label')
        .data(labels)
      .enter().append('text')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
        .attr('class', 'label')
        .attr('dx', '.5em')
        .style('fill', 'black')
        .style('font-size', '10px')
        // city name, as described above,
        // every `feature.property` gets assigned to the data itself
        .text(d => d.GEN)
    // add some points for the labels
    svg.selectAll('.point')
        .data(labels)
      .enter().append('circle')
        .attr('r', 2)
        .style('fill', d => M.getColor(d))  // the computed color function
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
  }
})
```

As mentioned, `drawExtra` (and actually all other functions in the [`playbook`](https://github.com/simonwoerpel/d3-playbooks-maps/blob/master/src/playbooks/maps/base_map.js#L33)) get the internal chart object as argument. These are some of the properties you can access in the `drawExtra`-method:

```javascript
drawExtra: M => {
  M.element  // the chart container element
  M.svg      // the main svg element (child of `M.element`)
  M.g        // the main svg group in which data is drawn, child of `M.svg`
  M.getColor // color computation function
  // for use like:
  foo.style('fill', d => M.getColor(d))

  M.drawedSelection  // the elements that where drawn by the `drawData` method,
                     // like bars for a barChart or geo paths for a map
  // this can be useful for something like this:
  M.drawedSelection.on('click', d => console.log(d))

  M.xScale   // computed scale for x-column
  M.yScale   // computed scale for y-column
  // useful to position stuff proportional to data like:
  foo.attr('x', d => M.xScale(d.value) + 10)

  // of course all properties from initialization:
  M.width
  M.height
  // ...

  // also breakpoint conditionals if `responsive: true` (see below)
  M.is_small
  M.is_middle
  M.is_large
}
```

### available options and their defaults

```javascript
defaults: {
    width: 600,
    height: 600,
    cssNamespace: 'd3-playbooks',
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    xCol: 'id',
    yCol: 'value',
    xTransform: d => d,
    yTransform: d => Number(d),
    responsive: true,
    responsiveSvg: false,
    color: d3.schemeCategory10.slice(3), // FIXME
    nullColor: 'gray',
    filter: false,
    drawExtra: c => {},
    breakpoints: {
        small: 480,
        medium: 768,
        large: 1280
    },
    isTopojson: false,
    projection: d3.geoMercator(),
    path: d3.geoPath(),
    topojsonLayerName: 'layer',
    topojsonObjectsAccessor: 'objects',
    getFeatures: d => d.geoData.features,
    getValue: f => Number(f.properties.value),
    getId: f => f.properties.id,
    getProps: f => f.properties
}
```

### Defaults

There are some global defaults for all chart types and some defaults for each specific one. Their can all be overriden for each chart type and of course each new chart instance during initialization.

Global defaults overwrite [hardcoded defaults](https://github.com/simonwoerpel/d3-playbooks-maps/blob/master/src/playbooks/maps/base_map.js) of this library. Type-wide defaults overwrite global defaults. Defaults on specific chart initialization overwrite type-wide defaults.

#### Global defaults

`d3.playbooks.defaults({<opts>})`

Set some app-wide defaults. They will be applied to each chart unless they are overriden on a per-type or per-initialization basis.

```javascript
d3.playbooks.defaults({
  width: 800,
  color: "red"
});
```

Defaults can also be functions, e.g. define how data-items (a bar, a circle, a map area) are colored:

```javascript
d3.playbooks.defaults({
  color: function(d) {
    return d.label === "Democrats" ? "blue" : "red";
  }
});
```

#### Defaults per type

`d3.playbooks.<chartType>.defaults({<opts>})`

Set some type-wide defaults. They will be applied to each chart of this type unless they are overriden during initialization.

For example, set a specific colorscheme for each `choroplethMap`:

```javascript
d3.playbooks.choroplethMap.defaults({
  color: d3.schemeBlues[9]
});
```

#### Defaults during initialization

`d3.playbooks.<chartType>({<opts>})`

Settings that apply to a specific chart.

```javascript
// initialize
var myMap = d3.playbooks.choroplethMap({
  geoDataUrl: "./europe.topo.json",
  isTopojson: true,
  getId: function(feature) {
    return feature.properties.RS
  }
});

// render
myMap.render();

// everything is chained:
d3.playbooks.choroplethMap({...}).render();
```

All of the defaults are available as getter / setter method on an initialized chart:

```javascript
var myMap = d3.playbooks.choroplethMap({...})
myMap.color()       // return actual color
myMap.color("red")  // set new color
```
Also, `d3-playbooks-maps` offers public methods for each map instance like `render`, `resize`, `update` (and some more if used together with `d3-playbooks-riot-components`).

Therefore changing the `colorScheme` and re-render the map is as simple as:

```javascript
myMap.color(d3.schemeBlues[9]).update()
```

Setters can also be chained:

```javascript
myMap.color("red").width(800).height(600).update()
```

### Responsiveness

There are two options to make a chart responsive.

#### responsive handling via javascript

The first one is (re)draw the dom elements based on parent container size. This is enabled via `responsive: true` during initialization. While this has some computation overhead (calculate dimensions via js, remove and add dom elements) it has the advantage to preserve e.g. font sizes for labels or annotations added via `drawExtra` (see above).

On resize, all `childNodes` of the main `g` svg element will be removed and redrawed based on the new dimensions and scales that are computed for the actual parent element size.

If you add some elements to the main `M.element`, which is the wrapper around the svg stuff, you can give it a css class named `--delete-on-update` to have them deleted. Because `drawExtra` is executed on every `resize` and `update`, stuff outside the main `g` element not flagged with this css class will be redrawn (not replaced) over and over and therefore will look ugly.

If `respnsive: true`, which is the default, there are some breakpoint helpers available. For example, to add an annotation only for middle- and large-sized screens, you could do it like:

```javascript
d3.playbooks.choroplethMap({
  // ...
  drawExtra: M => {
    if (!M.is_small) {
      // draw some stuff. This will automatically deleted and redrawn on resize & update.
      M.g.append(...)

      // draw some other stuff into the parent element and flag it to be redrawn on resize & update.
      // therefore it will be deleted if the screen becomes small which is what we want here.
      M.element.append("div")
        .attr("class", "my_legend --remove-on-update")
    }
  }
})
```

#### responsive handling via css

The other option is to set `responsiveSvg` (**TODO** should be named `responsiveCss`) to `true`.

This will avoid the js and dom rendering overhead described above and set some classes and attributes to the main svg element to automatically fit to the actual size and update on changed dimensions (during `resize` or `update`)

The downside is, there are no conditionals or breakpoint logics like `M.is_small` available and added labels or symbols to the svg element will become smaller or bigger, depending on changing screen sizes, because they won't be redrawn like the above approach. Instead, [just scaled via css](https://github.com/simonwoerpel/d3-playbooks-maps/blob/master/src/utils/setup/init_svg.js#L14).


## Examples

See `./dist` folder and `./src/examples.js`

Scroll down for an example to render an interactive map with components from [`d3-playbooks-riot-components`]().

A complete example how to render a map of the german state North-Rhine Westphalia and colorize the municipalities based on population density, which comes from an additonal csv file:

```javascript
d3.playbooks.choroplethMap({
  elementId: 'simple-map',
  dataUrl: './data/nrw_data.csv',
  geoDataUrl: './data/nrw_munis.geojson',
  responsiveSvg: true,
  xCol: 'regionalschluessel',
  yCol: 'bevoelkerungsdichte',
  getId: f => f.properties.RS.substring(1),
  drawExtra: M => {
    const labels = M.data.filter(d => d[M.yCol] > 2000).map(d => {
      const [x, y] = M.path.centroid(d)
      d.x = x
      d.y = y
      return d
    })
    M.g.selectAll('.label')
        .data(labels)
      .enter().append('text')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
        .attr('class', 'label')
        .attr('dx', '.5em')
        .style('fill', 'black')
        .style('font-size', '10px')
        .text(d => d.name)
    M.g.selectAll('.point')
        .data(labels)
      .enter().append('circle')
        .attr('r', 2)
        .style('fill', 'black')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
  }
}).render()
```

### Interactive map with components

Add `legend`, `infobox` and `selector` from [`d3-playbooks-riot-components`]()

[See this map in action](https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-e-coli-fluoroquinol/)

Be aware that without proper css for the components this would look ugly.

```html
<section class="superbugs-map-wrapper">
  <section id="superbugs-map"></section>
  <section id="superbugs-map__legend"></section>
  <section id="superbugs-map__info-wrapper">
    <section id="superbugs-map__selector"></section>
    <section id="superbugs-map__infobox"></section>
  </section>
</section>
```


```javascript
d3.playbooks.choroplethMap({
  elementId: 'superbugs-map',
  cssNamespace: 'superbugs-map',
  dataUrl: './data/e-coli.csv',
  geoDataUrl: './data/europe.topo.json',
  responsiveSvg: true,
  isTopojson: true,
  topojsonLayerName: 'europe_clipped',
  getId: f => f.properties.iso_a2,
  yExtent: [0, 64],
}).render()

.infobox({
  element: '#superbugs-map__infobox',
  template: `
    <h3>{name}</h3>
    <p class="infobox__data">{display_value}</p>
    <h4>Escherichia coli vs cephalosporins</h4>
    <p class="infobox__subtitle">Resistance to 3rd generation cephalosporins in percent.
    Of all infections with this bacterium, this percentage was resistant to this antibiotic.</p>
    <p class="infobox__eudata">EU: 12 %</p>
    <p class="infobox__annotation">ECDC Surveillance report 2014, except Poland (2013)</p>
  `
})

.selector({
  element: '#superbugs-map__selector',
  getLabel: f => f.name
})

.legend({
  element: '#superbugs-map__legend',
  wrapperTemplate: '<ul name="legend">{body}</ul>',
  itemTemplate: '<li style="background-color:{color}">{label} %</li>'
})
```
