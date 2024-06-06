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

    // 创建状态（矩形）
    var clockSource = new joint.shapes.standard.Rectangle();
    clockSource.position(50, 50);
    clockSource.resize(100, 40);
    clockSource.attr({
        body: {
            fill: 'lightblue'
        },
        label: {
            text: 'Clock Source',
            fill: 'black'
        }
    });
    clockSource.addTo(graph);

    var buffer1 = new joint.shapes.standard.Rectangle();
    buffer1.position(200, 50);
    buffer1.resize(100, 40);
    buffer1.attr({
        body: {
            fill: 'lightgreen'
        },
        label: {
            text: 'Buffer 1',
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
            text: 'Divider 1',
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
            text: 'Clock Mux 1',
            fill: 'black'
        }
    });
    mux1.addTo(graph);

    // 创建连接线
    var link1 = new joint.shapes.standard.Link();
    link1.source(clockSource, { anchor: { name: 'center' } });
    link1.target(buffer1, { anchor: { name: 'center' } });
    link1.router('manhattan');
    link1.addTo(graph);

    var link2 = new joint.shapes.standard.Link();
    link2.source(buffer1, { anchor: { name: 'center' } });
    link2.target(divider1, { anchor: { name: 'center' } });
    link2.router('manhattan');
    link2.addTo(graph);

    var link3 = new joint.shapes.standard.Link();
    link3.source(divider1, { anchor: { name: 'center' } });
    link3.target(mux1, { anchor: { name: 'center' } });
    link3.router('manhattan');
    link3.addTo(graph);

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
