<script setup lang="ts">

</script>

<template>
    <section class="import rounded-0 bg-white rounded-xl pa-5 pt-10 pb-5 ">
        <h1 class="primary-text text-capitalize text-center font-weight-bold">{{ $t('import.title') }}</h1>
        <h4 class="secondary-text  text-center">{{ $t('import.dec') }}</h4>

        <ul class="import-list">
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    hide-details
                    placeholder="1 word Phrase"
                    clearable
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    hide-details
                    clearable
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
            <li>
                <v-text-field
                    label="1 word Phrase"
                    persistent-hint
                    variant="solo-filled"
                    placeholder="1 word Phrase"
                    clearable
                    hide-details
                    density="comfortable"
                ></v-text-field>
            </li>
        </ul>

        <v-btn class="mt-3" block size="x-large" append-icon="mdi-step-forward">{{ $t('import.btn') }}</v-btn>
    </section>
</template>
<style scoped lang="scss">
.import {
    min-width: 600px;
    display: block;
}

.import-list {
    display: grid;
    width: 100%;
    padding: 1rem;
    grid-gap: 1rem;
    grid-template-columns: 30% 30% 30%;

    li {
    }
}

@media (max-width: 960px) {
    .import {
        width: 360px;
        min-width: auto;
        min-height: 50vh;
    }
    .import-list {
        grid-template-columns: 50% 50%;
    }
}
</style>
