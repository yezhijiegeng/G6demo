// customNode.js
import G6 from '@antv/g6';

class CustomNode extends G6.Node {
  draw(cfg, group) {
    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 30, // 圆的半径
        fill: '#C6E5FF',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    });

    // 添加文本标签
    group.addShape('text', {
      attrs: {
        x: 0,
        y: 10,
        text: cfg.label,
        fontSize: 12,
        fill: '#333',
        textAlign: 'center',
      },
    });

    return keyShape;
  }
}

export default CustomNode;