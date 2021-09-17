<template>
  <div class="flex flex-col min-h-screen max-h-screen overflow-x-hidden shadow-xl">
    <Navbar />
    <div class="flex-1 flex flex-col max-h-full overflow-y-auto overflow-x-hidden bg-blue-500">
      <div class="flex-1 container p-4 mx-auto flex flex-col justify-center">
        <nuxt />
      </div>
    </div>
  </div>
</template>
