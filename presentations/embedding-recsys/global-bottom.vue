<template></template>

<style>
/* Lift nav controls above Windows taskbar / browser chrome */
div.absolute.bottom-0.left-0 {
  bottom: 48px !important;
}

/* Hide goto dialog when closed — it's position:fixed so parent overflow:hidden doesn't clip it;
   with 30 slides the 666px tall element bleeds into viewport past the -80px offset */
#slidev-goto-dialog:has(input:disabled) {
  visibility: hidden;
}
</style>
