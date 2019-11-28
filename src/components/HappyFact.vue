<template>
    <div id="happy__window">
        <div class="happy-fact__container">
            <h1>HAPPY FACT</h1>
            <h3>{{activeFact.fact}}</h3>
            <h5>{{activeFact.source}}</h5>
        </div>
    </div>
</template>
<script>

export default {
    name: 'HappyFact',
    props: ['activeFact']
}
</script>

<style>
#happy__window{
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.happy-fact__container{
    border: 1px solid #555;
    padding: 2em;
}
</style>