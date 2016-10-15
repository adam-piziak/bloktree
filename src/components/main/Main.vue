<template>
  <div id="main" v-else>
    <header>
      <nav>
        <router-link to="/tasks">Tasks</router-link>
        <span class="link-divider"></span>
        <router-link to="/projects">Projects</router-link>
      </nav>
      <div id="user">
        <router-link to="/authenticate">Sign In</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>
