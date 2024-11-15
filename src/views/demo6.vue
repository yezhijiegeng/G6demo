<template>
  <div class="demo6Page w-full h-full flex flex-col">
    <div class="flex-1" id="editor"></div>
    <div class="mt-2 flex justify-start">
      <el-button size="mini" type="primary" @click="insertNodeFunc">插入节点</el-button>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import Delta from 'quill-delta';
import { InlineBlot, register } from 'parchment';
let quillEditor = null;
export default {
  name: 'demo6',
  components: {
  },
  data() {
    return {
      searchVal: '',
    }
  },
  methods: {
    insertNodeFunc() {
      // quillEditor.insertEmbed(quillEditor.getSelection()?.index || 0, 'AppPanelEmbed', `
      //     <span class="app_card_header">     
      //         自定义面板标题
      //     </span>
      // `);
      // quillEditor.insertEmbed(quillEditor.getSelection()?.index || 0, 'LinkBlot', `asdasd`);

      // quillEditor.insertText(1, 'Hello', {
      //   color: '#bb4d85',
      //   background: '#c6efff',
      //   padding: '2px'
      // });

      // quillEditor.setContents([
      //   { insert: 'Hello ' },
      //   {
      //     insert: 'World', attributes: {
      //       // bold: true,
      //       background: '#c6efff',
      //       color: '#3e83b5',
      //     }
      //   },
      // ]);
      console.log(quillEditor)
      quillEditor.updateContents(new Delta()
        // .retain(6)                  // Keep 'Hello '
        // .delete(5)                  // 'World' is deleted
        .insert('Quill')
        .retain(1, { bold: true })  // Apply bold to exclamation mark
      );
      // quillEditor.insertEmbed(3, 'AppPanelEmbed', `
      //     <span class="app_card_header">     
      //         自定义面板标题
      //     </span>
      // `);
      // quillEditor.insertText(3, 'WordBox', `自定义面板标题`);

      // quillEditor.insertEmbed(0, 'WordBox', 'asdasd');
    },
    makeNode1() {
      // 引入源码中的BlockEmbed
      const BlockEmbed = Quill.import('blots/block/embed');
      // 定义新的blot类型
      class AppPanelEmbed extends BlockEmbed {
        static create(value) {
          const node = super.create(value);
          node.setAttribute('contenteditable', 'true');
          node.style.backgroundColor = '#c6efff'
          node.style.padding = '2px'
          node.style.borderRadius = '2px'
          // node.setAttribute('width', '100%');
          //   设置自定义html
          node.innerHTML = this.transformValue(value)
          return node;
        }

        static transformValue(value) {
          let handleArr = value.split('\n')
          handleArr = handleArr.map(e => e.replace(/^[\s]+/, '')
            .replace(/[\s]+$/, ''))
          return handleArr.join('')
        }

        // 返回节点自身的value值 用于撤销操作
        static value(node) {
          return node.innerHTML
        }
      }
      // blotName
      AppPanelEmbed.blotName = 'AppPanelEmbed';
      // class名将用于匹配blot名称
      AppPanelEmbed.className = 'embed-innerApp';
      // 标签类型自定义
      AppPanelEmbed.tagName = 'span';
      Quill.register(AppPanelEmbed, true);
    },
    makeNode2() {
      // 自定义字符边框
      const inline = Quill.import('blots/inline')

      class WordBox extends inline {
        static create(value) {
          const node = super.create(value);
          //设置需要的样式
          node.setAttribute('style', 'border:1px solid #000000');
          node.innerText = value
          return node;
        }
      }

      WordBox.blotName = 'wordBox'; //工具栏中的名字与此名字需保持一致
      WordBox.tagName = 'wordBox';  //需要添加的标签名

      Quill.register(WordBox, true);
    },
  },
  mounted() {
    this.makeNode1();
    // this.makeNode2();
    quillEditor = new Quill('#editor', {
      // modules: {
      //   syntax: true,
      // },
      placeholder: '请输入...',
      theme: 'snow',
    });
  },
  beforeDestroy() {
  }
}
</script>
<style lang="scss" scoped>
.demo6Page {
  // 
}
</style>
