import { BaseNode } from '@antv/g6';
import { Circle } from '@antv/g';

// import type { Group } from '@antv/g';
// import type { BaseNodeStyleProps } from 'g6V5';

// interface ExtendBaseNode extends BaseNodeStyleProps {
//   // 自定义属性
//   radius: number;
// }

class ExtendBaseNode extends BaseNode {
  protected getKeyStyle(attributes) {
    return { ...super.getKeyStyle(attributes), r: attributes.radius };
  }

  // 重写方法
  protected drawKeyShape(attributes, container) {
    // 自定义绘制逻辑，创建一个 G.Circle
    return this.upsert('key', Circle, this.getKeyStyle(attributes), container);
  }
}