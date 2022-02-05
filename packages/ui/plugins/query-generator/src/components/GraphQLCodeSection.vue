<template>
    <div ref="root" />
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import CodeMirror, { Editor } from "codemirror";
import "codemirror-graphql/mode";
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        code: {
            type: String,
            required: true,
        },
        theme: String,
        showLineNumbers: Boolean,
    },
    setup() {
        return {
            root: ref<HTMLElement | null>(null),

        }
    },
    data() {
        return {
            codeMirror: null as Editor | null
        }
    },
    mounted() {
        this.codeMirror = CodeMirror(
            (elt) => {
                if (this.root) {
                    this.root.innerHTML = "";
                    this.root.appendChild(elt);
                }
            },
            {
                lineNumbers: this.$props.showLineNumbers,
                value: this.$props.code,
                theme: this.$props.theme,
                mode: "graphql",
                readOnly: true,
                indentUnit: 2,
                cursorBlinkRate: 0,
                cursorHeight: 0,
                smartIndent: true,
                dragDrop: false,
                spellcheck: false,
            }
        );
    },
    updated() {
        if (this.codeMirror) {
            this.codeMirror.setOption("theme", this.$props.theme)
            this.codeMirror.setOption("lineNumbers", this.$props.showLineNumbers)
            this.codeMirror.setValue(this.$props.code)
            this.codeMirror.refresh()
        }
    }
})
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);

code {
    font-family: "Fira Code", monospace;
}

.CodeMirror {
    height: auto;
    font-family: "Fira Code";
    font-size: 1.4em;
    line-height: 1.5em;
}

.CodeMirror-gutter-wrapper {
    padding-left: 30px;
}

.CodeMirror-lines {
    padding-left: 10px;
}
</style>
