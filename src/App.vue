<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <p gess>
      {{gess}}
    </p>
    <div id="example">
      <my-component></my-component>
    </div>
    <p>
      To get a better understanding of how this boilerplate works, check out
      <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
      It is also recommended to go through the docs for
      <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
      <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
      If you have any issues with the setup, please file an issue at this boilerplate's
      <a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.
    </p>
    <p>
      You may also want to checkout
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
      <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.
    </p>
  </div>
</template>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>

<script type="text/babel">
  import Vue from 'vue';
  const Profile = Vue.extend({
    template: '<p>i am orange</p>',
  });
  function gedwat({ x = 1, y = 2 } = {}) {
    console.log(x, y);
  }
  gedwat(); // 1 2
  gedwat({ x: 3 });//  3, 2
  gedwat({ x: 4, y: 5 });// 4, 5

  gedwat({ z: 30 });// 1 2

  // 注册
  Vue.component('my-component', Profile);
  // 创建根实例
  const vm = new Vue({
    computed: {
      gess() {
        return '1234567890';
      },
    },
  });
  console.log(vm.gress);
</script>
