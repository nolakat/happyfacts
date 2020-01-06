<template>
        <div class="happy-fact__container">
            <div class="happy-fact__inner">
                <h5 class="happy-fact__label">HAPPY FACT #{{activeFact.id}}</h5>
                <h1 class="happy-fact__content">{{activeFact.fact}}</h1>
                <h5 class="happy-fact__source"><a :href="activeFact.source" target="_blank">Source</a></h5>
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

<style lang="scss">



</style>