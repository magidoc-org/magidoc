<template>
    <div>
        <GraphQLCodeSection
            :v-if="showQueryPanel"
            :code="query"
            :theme="theme"
            :show-line-numbers="showQueryPanelLineNumbers"
            :height="queryPanelHeight"
        />

        <div :v-if="showVariablesPanel">
            <div class="CodeMirror-gutters qg-variables-separator">
                Variables
            </div>
            <GraphQLVariableSection
                :code="variables"
                :theme="theme"
                :height="variablesPanelHeight"
                :show-line-numbers="showVariablesPanelLineNumbers"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Field } from '@core/models/introspection'
import { GeneratorConfig } from '@core/generator/config'
import { generateGraphQLQuery } from '@core/generator/queryGenerator'
import { TypesByName } from '@core/models/typesByName'
import { defineComponent, PropType } from 'vue'
import GraphQLCodeSection from './components/GraphQLCodeSection.vue'
import GraphQLVariableSection from './components/GraphQLVariableSection.vue'

export default defineComponent({
    components: { GraphQLCodeSection, GraphQLVariableSection },
    props: {
        typesByName: {
            type: Object as PropType<TypesByName>,
            required: true,
        },
        field: {
            type: Object as PropType<Field>,
            required: true,
        },
        generatorConfig: {
            type: Object as PropType<Partial<GeneratorConfig>>,
            required: false,
        },
        theme: {
            type: String,
            default: 'default',
        },
        showQueryPanelLineNumbers: {
            type: Boolean,
            default: true,
        },
        showVariablesPanelLineNumbers: {
            type: Boolean,
            default: false,
        },
        showQueryPanel: {
            type: Boolean,
            default: true,
        },
        showVariablesPanel: {
            type: Boolean,
            default: true,
        },
        queryPanelHeight: {
            type: Object as PropType<'auto' | number>,
            default: 'auto',
        },
        variablesPanelHeight: {
            type: Object as PropType<'auto' | number>,
            default: 'auto',
        },
    },
    data() {
        const result = generateGraphQLQuery(
            this.field,
            this.typesByName,
            this.generatorConfig,
        )

        return {
            query: result?.query || '',
            variables: JSON.stringify(result?.variables || {}, null, 2) + '\n',
        }
    },
})
</script>

<style>
.qg-variables-separator {
    font-family: inherit;
    position: relative;
    padding: 5px 0px;
    font-family: inherit;
}
</style>
