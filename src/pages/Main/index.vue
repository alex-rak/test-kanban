<template>
  <div class="main-page">
    <div class="column">
      <tasks-column
        title="on-hold"
        header-color="orange"
        :items="[{id: 1, title: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'},
                 {id: 2, title: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'},
                 {id: 3, title: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'}]" />
    </div>
    <div class="column">
      <tasks-column
        title="in progress"
        header-color="blue"
        :items="[{id: 1, title: 'ssss'}]" />
    </div>
    <div class="column">
      <tasks-column
        title="needs review"
        header-color="yellow"
        :items="[{id: 1, title: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'}]" />
    </div>
    <div class="column">
      <tasks-column
        title="approved"
        header-color="green"
        :items="[]" />
    </div>
  </div>
</template>

<script>
import TasksColumn from "@/components/TasksColumn";
export default {
  name: "MainPage",
  components: {
    TasksColumn,
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-wrap: wrap;
  .column {
    display: flex;
    justify-content: center;
    width: 25%;
  }
}
@media screen and (max-device-width: 1600px) {
  .main-page {
    justify-content: center;
    align-items: center;
    .column {
      width: 50%;
    }
  }
}
@media screen and (max-device-width: 800px) {
  .main-page {
    justify-content: center;
    align-items: center;
    .column {
      width: 100%;
    }
  }
}
</style>
