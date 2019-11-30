<template>
        <div class="happy-fact__container">
            <div class="happy-fact__inner">
                <h5 class="happy-fact__label">HAPPY FACT #{{activeFact.id}}</h5>
                <h3 class="happy-fact__content">{{activeFact.fact}}</h3>
                <h5><a :href="activeFact.source" target="_blank">Source</a></h5>
            </div>
        </div>
</template>
<script>
 /* eslint-disable */


export default {
    name: 'HappyFact',
    props: ['activeFact'],
}
</script>

<style>

.happy-fact__container{
    border: 1px solid #555;
    padding: 2em;
    max-width: 75vw;
    z-index: 2;
}

.happy-fact__label{
    letter-spacing: .5px;
    padding-bottom: 1px;
    border-bottom: 1px solid;
    border-color: inherit;
    width: fit-content;
    display: table;
    margin: 0 auto;
}

</style>