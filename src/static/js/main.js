(function() {
  'use strict';
  $('#homeTab a').click(function (e) {
    e.preventDefault()
    console.log('click: ' + e.preventDefault())
    // $(this).tab('show')
  })
})();

