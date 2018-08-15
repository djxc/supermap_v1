import OpenLayers from 'openlayers'

OpenLayers.Control.LegendControl = OpenLayers.Class(OpenLayers.Control, {
    legendDiv: null,
    layers: [],
    colorDiv_w: 30,
    colorDiv_h: 20,
    /*
     * layers --Array
     * */
    initialize: function (layers, options) {
        OpenLayers.Control.prototype.initialize.apply(this, options);

        this.setLayers(layers);    
    },
    setMap: function(map) {
        var me = this;
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        if(me.map){
            me.map.events.register("moveend", me, me.redraw);
            me.map.events.register("changelayer", me, function(evt){
                if(evt.property == "visibility")
                    this.redraw();
            });
        }
    },
    //{Array or Object}
    setLayers: function(layers){
        var me = this;
        if(OpenLayers.Util.isArray(layers)){
            me.layers = layers;
        }
    },
    addLayer: function(layer){
        this.layers.push(layer);

        this.redraw();
    },
    redraw: function(){
        if(this.div.style.display == "none"){
            return;
        }
        if(this.legendDiv){
            this.div.removeChild(this.legendDiv);
            this.legendDiv = null;
        }
        this.draw();
    },
    display: function(display) {
        this.div.style.display = (display) ? "" : "none"; 
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);

        // create layout divs
        this.loadContents();

        return this.div;
    },
    loadContents: function(){
        if(!this.legendDiv){
            this.legendDiv = document.createElement("div");
            this.legendDiv.id = this.id + "_legendDiv";
            OpenLayers.Element.addClass(this.legendDiv, "legendDiv"); 
            this.div.appendChild(this.legendDiv);

            // create span
            var labelSpan = document.createElement("label");
            labelSpan.innerHTML = "Legend";
            OpenLayers.Element.addClass(labelSpan, "title");
            this.legendDiv.appendChild(labelSpan); 
            var brSpan = document.createElement("br");
            this.legendDiv.appendChild(brSpan); 

            for(var i = 0; i < this.layers.length;i ++){
                var layer = this.layers[i];
                if(!layer.getVisibility()){
                    continue;
                }
                var geom = hxmap.util.getLayerDefaultGeometry(layer);
                if(!geom)
                    continue;
                
                //one table corresponds to a layer
                var labelLyr = document.createElement("label");
                labelLyr.innerHTML = layer.name;
                this.legendDiv.appendChild(labelLyr);
                var tableDiv = document.createElement("table");
                this.legendDiv.appendChild(tableDiv);
                
                var featArray = layer.features;
                var unrenderFeatures = layer.unrenderedFeatures;
                var arr = Object.keys(unrenderFeatures);
                if(arr.length == featArray.length)
                    continue;
                
                var styleRules = layer.styleMap.styles["default"].rules;
                var geomType = "point";
                //decide symbolizer panel from geometry type
                if(geom instanceof OpenLayers.Geometry.Point ||
                        geom instanceof OpenLayers.Geometry.MultiPoint) {
                    var allFilters = [];
                    var bElseFilter = 2;
                    for(var key in styleRules) {
                        var filter = styleRules[key].filter;
                        if(filter){
                            allFilters.push(filter);
                        }
                        else{ //no filter
                            bElseFilter = styleRules[key].elseFilter;
                        }
                    }
                    //
                    if(!bElseFilter){    //no else filter --deafault
                        var trDiv = this.createPointLegend(geom.id, "default");
                        tableDiv.appendChild(trDiv);
                    }
                    else{    //find filter's geometry id
                        var filterIDs = [];

                        var findResults = {};
                        var findCount = 0;
                        for(var dex = 0; dex < featArray.length; dex ++){
                            if(findCount == allFilters.length + 1)
                                break;
                            
                            var feat = featArray[dex];
                            if(arr.indexOf(feat.id) >= 0)
                                continue;

                            var beInfilter = false;
                            for(var fk = 0; fk < allFilters.length; fk ++){
                                var bFilter = allFilters[fk].evaluate(feat);
                                if(bFilter){
                                    beInfilter = true;
                                    if(!findResults[allFilters[fk].toString()]){
                                        var svgId = feat.geometry.id;
                                        filterIDs.push({
                                            id:svgId,
                                            label: allFilters[fk].toString()
                                        });
                                        findResults[allFilters[fk].toString()] = true;
                                        findCount ++;                                        
                                    }
                                    break;
                                }

                            }
                            if(!beInfilter && (!findResults["default"])){    //false
                                var svgId = feat.geometry.id;
                                filterIDs.push({
                                    id:svgId,
                                    label: "default"
                                });
                                findResults["default"] = true;
                                findCount ++;
                            }
                        }
                        for(var fDex = 0; fDex < filterIDs.length; fDex ++){
                            var trDiv = this.createPointLegend(filterIDs[fDex].id, filterIDs[fDex].label);
                            tableDiv.appendChild(trDiv);                        
                        }
                    }

                    continue;    //skip next code
                } else if(geom instanceof OpenLayers.Geometry.LineString ||
                        geom instanceof OpenLayers.Geometry.MultiLineString) {
                    geomType = "line";

                } else if(geom instanceof OpenLayers.Geometry.LinearRing ||
                        geom instanceof OpenLayers.Geometry.Polygon ||
                        geom instanceof OpenLayers.Geometry.MultiPolygon) {
                    geomType = "polygon";
                }

                for(var key in styleRules) {
                    var filter = styleRules[key].filter;
                    var sybol = styleRules[key].symbolizer;
                    var labelTxt = "";
                    if(filter) {
                        labelTxt = filter.toString();
                    }
                    else{
                        labelTxt = "default";
                    }

                    var trDiv = document.createElement("tr");
                    tableDiv.appendChild(trDiv);
                    var colorTd = document.createElement("td");
                    trDiv.appendChild(colorTd);

                    var labelTd = document.createElement("td");
                    trDiv.appendChild(labelTd);

                    var itemLabel = document.createElement("label");
                    itemLabel.style = "margin-left:5px;position:relative;top:3px;";
                    itemLabel.innerHTML = labelTxt;
                    labelTd.appendChild(itemLabel);

                    if(geomType == "line"){
                        if(sybol.Line){
                            var colorDiv = this.createLineLegend(sybol.Line);
                            colorTd.appendChild(colorDiv);
                        }
                    }
                    else if(geomType == "polygon"){
                        if(sybol.Polygon){
                            var colorDiv = this.createPolygonLegend(sybol.Polygon);
                            colorTd.appendChild(colorDiv);                        
                        }
                    }
                }
            }

        }
    },
    createPolygonLegend: function(polygonSybol){
        var colorDiv = document.createElement("div");
        if(polygonSybol.fill){
            var color = this.parseColor(polygonSybol.fillColor, polygonSybol.fillOpacity);
            colorDiv.style.background = color;
        }
        if(polygonSybol.stroke){
            var dashStyle = polygonSybol.strokeDashstyle;
            var color = this.parseColor(polygonSybol.strokeColor, polygonSybol.strokeOpacity);
            var width = polygonSybol.strokeWidth + "px";
            colorDiv.style.border = width + " " + dashStyle + " " + color;
        }
        colorDiv.style.height = this.colorDiv_h + "px";
        colorDiv.style.width = this.colorDiv_w + "px";
        return colorDiv;
    },
    /*
     * <svg><polyline points="20,27,34,21" fill="none" stroke="#550000" stroke-opacity="1" stroke-width="3"
     * stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none"></polyline></svg>
     * */
    createLineLegend: function(lineSybol){
        var colorDiv = document.createElement("div");
        colorDiv.style.height = this.colorDiv_h + "px";
        colorDiv.style.width = this.colorDiv_w + "px";

        var lineHtml = '<svg width="100%" height="100%">';
        lineHtml += '<polyline points="2,2,28,18" fill="none" stroke="' + lineSybol.strokeColor 
        + '" stroke-opacity="'+ lineSybol.strokeOpacity +'" stroke-width="'+ lineSybol.strokeWidth + '"';
        lineHtml += ' stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none"></polyline></svg>';
        colorDiv.innerHTML = lineHtml;

        return colorDiv;
    },
    createPointLegend: function(svgId, label){
        var trDiv = document.createElement("tr");
        var svgEle = document.getElementById(svgId);
        if(!svgEle){
            return trDiv;
        }
        var colorTd = document.createElement("td");
        trDiv.appendChild(colorTd);

        var labelTd = document.createElement("td");
        trDiv.appendChild(labelTd);
        var itemLabel = document.createElement("label");
        itemLabel.style = "margin-left:5px;position:relative;top:3px;";
        itemLabel.innerHTML = label;
        labelTd.appendChild(itemLabel);

        var colorDiv = document.createElement("div");
        colorTd.appendChild(colorDiv);
        var divHeight = this.colorDiv_h;
        var divWidth = this.colorDiv_w;

        var cln = svgEle.cloneNode(true);
        if(cln.nodeName.toLowerCase() != "svg"){    //circle,image
            var rVal = cln.getAttribute("r");
            if(cln.hasAttribute("x") && cln.hasAttribute("y")){
                cln.setAttribute("x", rVal);
                cln.setAttribute("y", rVal);                
            }
            if(cln.hasAttribute("cx") && cln.hasAttribute("cy")){
                cln.setAttribute("cx", rVal);
                cln.setAttribute("cy", rVal);
            }
            if(cln.hasAttribute("transform")){
                var transform = cln.getAttribute("transform");
                if(transform.indexOf('rotate(') >= 0){
                    var transValues = transform.split('rotate(');
                    var kk = null;
                    if(transValues.length == 1){
                        kk = 0;
                    }
                    else if(transValues.length > 1){
                        kk = 1;
                    }
                    if(kk != null){
                        var str = transValues[kk];
                        var sp = str.indexOf(')');
                        var rotString = str.substring(0, sp);

                        var ww = parseFloat(cln.getAttribute('width'));
                        var hh = parseFloat(cln.getAttribute('height'));
                        if(ww >= divWidth)
                            divWidth = ww + 2;
                        if(hh >= divWidth)
                            divHeight = hh + 2;

                        var rotValues = rotString.split(' ');
                        rotValues[1] = ww / 2;
                        rotValues[2] = hh / 2;

                        transValues[kk] = rotValues.join(' ') + str.substring(sp);
                        cln.setAttribute('transform',transValues.join('rotate('));                            
                    }
                }

            }
            //innerHTML
            colorDiv.innerHTML = '<svg width="100%" height="100%"></svg>';
            var svgNode = colorDiv.firstChild;
            svgNode.appendChild(cln);
            colorDiv.appendChild(svgNode);
        }
        else{
            //change viewBox --from(0,0)
            var viewBox = cln.getAttribute('viewBox');    // Grab the object representing the SVG element's viewBox attribute.
            var viewBoxValues = viewBox.split(' ');                // Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).

            /* The array is filled with strings, convert the first two viewBox values to floats: */
            viewBoxValues[0] = parseFloat(viewBoxValues[0]);    // Represent the x-coordinate on the viewBox attribute.
            viewBoxValues[1] = parseFloat(viewBoxValues[1]);    // Represent the y coordinate on the viewBox attribute.
            viewBoxValues[2] = parseFloat(viewBoxValues[2]);    // Represent the y coordinate on the viewBox attribute.

            if(viewBoxValues[2] > 300){    //star
                viewBoxValues[0] = 250;
                viewBoxValues[1] = 75;
            }
            else{
                viewBoxValues[0] = 0;
                viewBoxValues[1] = 0;                
            }

            cln.setAttribute('viewBox', viewBoxValues.join(' '));
            colorDiv.appendChild(cln);                                    
        }

        colorDiv.style.height = divHeight + "px";
        colorDiv.style.width = divWidth + "px";
        return trDiv;        
    },
    parseColor: function(value, opacity){
        if(value.length == 7){
            var str = value.substr(1,6);
            var rgb1 = parseInt(str.substr(0, 2), 16);              
            var rgb2 = parseInt(str.substr(2, 2), 16);
            var rgb3 = parseInt(str.substr(4, 2), 16);
            return "rgba("+rgb1+","+rgb2+","+rgb3+","+opacity+")";
        }
        else{
            return value;
        }
    },
    CLASS_NAME: "OpenLayers.Control.LegendControl"
});