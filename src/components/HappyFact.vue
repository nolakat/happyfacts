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

.happy-fact__container{
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

.happy-fact__content{
    font-size: 2.5em;
    padding: 35px 0px;

}

.happy-fact__source{
    text-transform: uppercase;
    display: flex;
    opacity: .75;
    justify-content: flex-end;
    transition: opacity .3s ease;


    &:hover{
        opacity: 1;
        transition: opacity .3s ease;
    }
}

</style>