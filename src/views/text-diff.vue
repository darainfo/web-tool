<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Text Diff</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <div class="btn-example">
            <template v-if="!isViewer">
              <button type="button" @click="diffMove('previous')" class="btn btn-light-secondary btn-sm">{{ $t("prev") }}</button>
              <button type="button" @click="diffMove('next')" class="btn btn-light-secondary btn-sm">{{ $t("next") }}</button>
              <button type="button" @click="viewerToggle(true)" class="btn btn-light-secondary btn-sm">{{ $t("viewer.view") }}</button>
            </template>
            <template v-else>
              <button type="button" @click="viewerMove('previous')" class="btn btn-default">{{ $t("prev") }}</button>
              <button type="button" @click="viewerMove('next')" class="btn btn-default">{{ $t("next") }}</button>
              <button type="button" @click="viewerToggle(false)" class="btn btn-default">{{ $t("close") }}</button>
            </template>
          </div>
          <div class="row" style="height: calc(100vh - 270px); min-height: 380px">
            <div id="diffEditor"></div>
          </div>
          <div>
            <div id="lineDiff" style="width: 100%; height: 40px"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.monaco-diff-editor {
  border: 1px solid #dddddd;
}
#lineDiff .monaco-diff-editor {
  border-top-width: 0px;
}
</style>
<script>
import * as monaco from "monaco-editor";

let diffEditor;
let lineDiffViewer;
export default {
  components: {},

  data() {
    return {
      options: {},
      isViewer: false,
    };
  },
  mounted() {
    diffEditor = monaco.editor.createDiffEditor(document.getElementById("diffEditor"), {
      renderOverviewRuler: false,
      useInlineViewWhenSpaceIsLimited: false,
      renderSideBySide: true,
      automaticLayout: true,
      originalEditable: true,
      scrollbar: {
        // alwaysConsumeMouseWheel: false,
      },
    });
    this.diff("", "", "");
  },
  methods: {
    diff(source, target, language) {
      language = language || "sql";
      const leftModel = monaco.editor.createModel(source, language);
      const rightModel = monaco.editor.createModel(target, language);

      diffEditor.setModel({
        original: leftModel,
        modified: rightModel,
      });
      this.lineViewer();
    },
    lineViewer() {
      diffEditor.getOriginalEditor().onMouseUp((event) => {
        const position = event.target.position;
        const lineNumber = (position || {}).lineNumber;
        this.lineDiff(lineNumber);
      });

      diffEditor.getModifiedEditor().onMouseUp((event) => {
        const position = event.target.position;
        const lineNumber = (position || {}).lineNumber;
        this.lineDiff(lineNumber);
      });

      lineDiffViewer = monaco.editor.createDiffEditor(document.getElementById("lineDiff"), {
        renderOverviewRuler: false,
        useInlineViewWhenSpaceIsLimited: false,
        originalEditable: true,
        renderSideBySide: false, // 차이점을 좌우로 나란히 표시하는 옵션
        automaticLayout: true,
        lineNumbers: "off", // Line numbers off
        glyphMargin: false, // Glyph margin off
        readOnly: true,
        scrollBeyondLastLine: false, // 마지막 줄 이후 스크롤 비활성화
        scrollbar: {
          vertical: "hidden", // 수직 스크롤바 숨기기
          horizontal: "hidden", // 수평 스크롤바 숨기기
        },
      });
    },
    lineDiff(lineNumber) {
      if (lineNumber == null || lineNumber == "" || typeof lineNumber === "undefined") {
        return;
      }

      const orginEditor = diffEditor.getOriginalEditor().getModel();
      const modifiedEditor = diffEditor.getModifiedEditor().getModel();
      let orginContent = null,
        modifiedContent = null;
      if (orginEditor.getLineCount() >= lineNumber) {
        orginContent = orginEditor.getLineContent(lineNumber);
      }

      if (modifiedEditor.getLineCount() >= lineNumber) {
        modifiedContent = modifiedEditor.getLineContent(lineNumber);
      }

      lineDiffViewer.setModel({
        original: monaco.editor.createModel(orginContent, "plaintext"),
        modified: monaco.editor.createModel(modifiedContent, "plaintext"),
      });
    },

    diffMove(mode) {
      if (mode == "next") {
        diffEditor.goToDiff("next");
      } else {
        diffEditor.goToDiff("previous");
      }
    },
    //
    viewerMove(mode) {
      if (mode == "next") {
        diffEditor.accessibleDiffViewerNext();
      } else {
        diffEditor.accessibleDiffViewerPrev();
      }
    },
    // 뷰어 토글
    viewerToggle(flag) {
      this.isViewer = flag;
      if (flag) {
        diffEditor.updateOptions({ onlyShowAccessibleDiffViewer: true });
        diffEditor._accessibleDiffViewer.value._setVisible(true);
      } else {
        diffEditor.updateOptions({ onlyShowAccessibleDiffViewer: false });
        diffEditor._accessibleDiffViewer.value._setVisible(false);
      }
    },
    updateEditorOptions(opts) {
      diffEditor.updateOptions(opts);
    },
  },
};
</script>
