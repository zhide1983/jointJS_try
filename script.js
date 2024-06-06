
$(document).ready(function() {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper'),
        model: graph,
        width: 800,
        height: 600,
        gridSize: 10,
        drawGrid: true,
        background: {
            color: 'white'
        },
        interactive: {
            linkMove: true
        },
        defaultLink: new joint.shapes.standard.Link({
            attrs: {
                line: {
                    stroke: 'black',
                    strokeWidth: 2,
                    targetMarker: {
                        type: 'path',
                        d: 'M 10 -5 0 0 10 5 Z'
                    }
                }
            },
            router: {
                name: 'manhattan'
            }
        })
    });

    
        var clock_source = new joint.shapes.standard.Rectangle();
        clock_source.position(50, 50);
        clock_source.resize(100, 40);
        clock_source.attr({
            body: {
                fill: 'lightblue'
            },
            label: {
                text: 'clock_source',
                fill: 'black'
            }
        });
        clock_source.addTo(graph);
        
        var buffer1 = new joint.shapes.standard.Rectangle();
        buffer1.position(200, 50);
        buffer1.resize(100, 40);
        buffer1.attr({
            body: {
                fill: 'lightgreen'
            },
            label: {
                text: 'buffer1',
                fill: 'black'
            }
        });
        buffer1.addTo(graph);
        
        var divider1 = new joint.shapes.standard.Rectangle();
        divider1.position(350, 50);
        divider1.resize(100, 40);
        divider1.attr({
            body: {
                fill: 'lightyellow'
            },
            label: {
                text: 'divider1',
                fill: 'black'
            }
        });
        divider1.addTo(graph);
        
        var mux1 = new joint.shapes.standard.Rectangle();
        mux1.position(500, 50);
        mux1.resize(100, 40);
        mux1.attr({
            body: {
                fill: 'lightcoral'
            },
            label: {
                text: 'mux1',
                fill: 'black'
            }
        });
        mux1.addTo(graph);
        

    
        var link_clock_source_buffer1 = new joint.shapes.standard.Link();
        link_clock_source_buffer1.source(clock_source, { anchor: { name: 'center' }});
        link_clock_source_buffer1.target(buffer1, { anchor: { name: 'center' }});
        link_clock_source_buffer1.router('manhattan');
        link_clock_source_buffer1.addTo(graph);
        
        var link_buffer1_divider1 = new joint.shapes.standard.Link();
        link_buffer1_divider1.source(buffer1, { anchor: { name: 'center' }});
        link_buffer1_divider1.target(divider1, { anchor: { name: 'center' }});
        link_buffer1_divider1.router('manhattan');
        link_buffer1_divider1.addTo(graph);
        
        var link_divider1_mux1 = new joint.shapes.standard.Link();
        link_divider1_mux1.source(divider1, { anchor: { name: 'center' }});
        link_divider1_mux1.target(mux1, { anchor: { name: 'center' }});
        link_divider1_mux1.router('manhattan');
        link_divider1_mux1.addTo(graph);
        

    // 添加工具
    graph.getLinks().forEach(function(link) {
        var verticesTool = new joint.linkTools.Vertices({
            removeVertex: true // 允许删除顶点
        });
        var segmentsTool = new joint.linkTools.Segments({
            snapRadius: 10 // 鼠标靠近时移动整条线段而不是添加顶点
        });

        var toolsView = new joint.dia.ToolsView({
            tools: [segmentsTool, verticesTool]
        });

        link.findView(paper).addTools(toolsView);
    });

    // 创建导出SVG的函数
    window.exportSVG = function() {
        // 隐藏导航点
        $('.joint-cell.joint-link .marker-vertices').hide();
        $('.joint-cell.joint-link .marker-segment').hide();

        // 导出SVG
        var svg = paper.svg;
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svg);

        // 显示导航点
        $('.joint-cell.joint-link .marker-vertices').show();
        $('.joint-cell.joint-link .marker-segment').show();

        var a = document.createElement('a');
        var blob = new Blob([svgString], {type: 'image/svg+xml'});
        a.href = URL.createObjectURL(blob);
        a.download = 'clock_tree.svg';
        a.click();
    };
});
