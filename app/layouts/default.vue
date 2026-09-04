<template>
  <div class="min-h-dvh">
    <SettingsLanguageToggle class="fixed right-1 top-1 z-50" />
    <LayoutNavbar class="fixed inset-x-0 bottom-0 z-50 flex bg-[#010101]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] sm:bottom-auto sm:top-0 sm:bg-transparent sm:backdrop-blur-none sm:pb-0" />
    <div class="pb-[calc(5rem+env(safe-area-inset-bottom))] sm:mt-[50px] sm:pb-0">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>
