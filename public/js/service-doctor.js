/* -------- TABS HANDLER -------- */
$('.tabs').each(function () {
  const $tabsWrapper = $(this);
  const $buttons = $tabsWrapper.find('.tab-btn');
  const $indicator = $tabsWrapper.find('.tab-indicator');

  function moveIndicator($btn) {
    $indicator.css({
      left: $btn.position().left + 'px',
      width: $btn.outerWidth() + 'px',
      height: $btn.outerHeight() + 'px'
    });
  }

  // Init
  const $activeBtn = $buttons.filter('.active');
  moveIndicator($activeBtn);

  showTabContent($activeBtn.data('type'), $tabsWrapper);

  $buttons.on('click', function () {
    const $btn = $(this);
    const type = $btn.data('type');

    $buttons.removeClass('active');
    $btn.addClass('active');

    moveIndicator($btn);
    showTabContent(type, $tabsWrapper);
  });

  $(window).on('resize', function () {
    moveIndicator($buttons.filter('.active'));
  });
});

// Scoped content handler
function showTabContent(type, $tabsWrapper) {
  const group =
    $tabsWrapper.hasClass('tabs-home') ? '.tabs-home-content' : '.tabs-inner-content';

  $(group).addClass('hidden');
  $(group).filter(`[data-type="${type}"]`).removeClass('hidden');
}

/* -------- DROPDOWN HANDLER -------- */

// Toggle dropdown
$(document).on('click', '.dropdown-trigger button', function (e) {
    e.stopPropagation();
    $('.dropdown-menu').not($(this).next()).addClass('hidden');
    $(this).next('.dropdown-menu').toggleClass('hidden');
});

// Select item
$(document).on('click', '.dropdown-item', function () {
    const value = $(this).text();
    const dropdown = $(this).closest('.custom-dropdown');

    dropdown.find('.selected-text').text(value);
    dropdown.find('.dropdown-menu').addClass('hidden');
});

// Close on outside click
$(document).on('click', function () {
    $('.dropdown-menu').addClass('hidden');
});

/* -------- STEPS HANDLER -------- */

$(document).ready(function () {
  goToStep(1);
});


function goToStep(stepNumber) {

  // Hide all step content
  $('.step-content').addClass('hidden');
  const $currentStep = $('#step-' + stepNumber).removeClass('hidden');

  const $container = $('.main-section');

  setTimeout(() => {
    $container.animate({ scrollTop: 0 }, 300);
  }, 50);

  // Reset all
  $('.step-circle').removeClass('active-step');
  $('.step-label').removeClass('active-heading');
  $('.step-line').removeClass('active-line');

  // Activate current + previous steps
  $('.step-circle').each(function () {
    if ($(this).data('step') <= stepNumber) {
      $(this).addClass('active-step');
    }
  });

  $('.step-label').each(function () {
    if ($(this).data('step') <= stepNumber) {
      $(this).addClass('active-heading');
    }
  });

  // Activate completed lines
  $('.step-line').each(function () {
    if ($(this).data('step') < stepNumber) {
      $(this).addClass('active-line');
    }
  });
}

$(document).on('click', '.step-btn', function () {
    const targetStep = $(this).data('target');
    goToStep(targetStep);
});


/* -------- SERVICE CARD HANDLER -------- */


const serviceCardTemplate = () => `
<div class="service-card rounded-lg px-4 py-6 relative bg-[#F9FAFB]">
      <button class="remove-service absolute top-3 right-3 text-ebony hover:text-red-500">✕</button>

      <!-- Category Dropdown -->
      <div class="mb-4 custom-dropdown">
          <label class="text-base sm:text-lg text-jet-black font-semibold">Select Category</label>

          <div class="dropdown-trigger mt-2">
              <button type="button" class="w-full border border-slate-gray rounded-md px-3 py-3 text-left flex justify-between items-center">
                  <span class="selected-text text-sm sm:text-base font-normal text-dark-gray">Surgery</span>
                  <span class="material-symbols-outlined">
                      keyboard_arrow_down
                  </span>
              </button>

              <ul class="dropdown-menu hidden absolute z-20 mt-1 w-1/2 bg-white border border-primary-blue rounded shadow text-sm sm:text-base text-dark-gray font-normal h-40 overflow-y-auto scroll">
                  <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Surgery</li>
                  <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Diagnostics</li>
                  <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Consultation</li>
                  <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Donation</li>
              </ul>
          </div>
      </div>

      <div class="grid grid-col-1 sm:grid-cols-2 gap-4">
          <div class="custom-dropdown">
              <label class="text-base sm:text-lg text-jet-black font-semibold">Select Service</label>

              <div class="dropdown-trigger mt-2">
                  <button type="button" class="w-full border border-slate-gray rounded-md px-3 py-3 text-left flex justify-between items-center">
                      <span class="selected-text text-sm sm:text-base font-normal text-dark-gray">Elective Surgery</span>
                      <span class="material-symbols-outlined">
                          keyboard_arrow_down
                      </span>
                  </button>

                  <ul class="dropdown-menu hidden absolute z-20 mt-1 w-1/2 bg-white border border-primary-blue rounded shadow text-sm sm:text-base text-dark-gray font-normal h-40 overflow-y-auto scroll">
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Next Day</li>
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Emergency Surgery</li>
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Day Care Surgery</li>
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Notification log</li>
                  </ul>
              </div>
          </div>

          <!-- Price -->
          <div>
              <label class="text-base sm:text-lg text-jet-black font-semibold">Price</label>
              <input type="text"
                  class="w-full border border-slate-gray rounded-md px-3 py-3 mt-2 focus:outline-none"
                  value="₹ 0.00">
          </div>
      </div>
  </div>
`;

$(document).on('click', '.add-service', function () {
    const stepContent = $(this).closest('.step-content');
    stepContent.find('.services-list').append(serviceCardTemplate());
});

$(document).on('click', '.remove-service', function () {
    $(this).closest('.service-card').remove();
});

/* -------- SERVICE CARD HANDLER -------- */


const visitServiceCardTemplate = () => `
<div class="service-card rounded-lg px-4 py-3 relative bg-[#F9FAFB]">
<button class="remove-service-visit absolute top-3 right-3 text-ebony hover:text-red-500">✕</button>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="custom-dropdown">
              <label class="text-base sm:text-lg text-jet-black font-semibold">Visit Type</label>

              <div class="dropdown-trigger mt-2">
                  <button type="button" class="w-full border border-slate-gray rounded-md px-3 py-3 text-left flex justify-between items-center">
                      <span class="selected-text text-sm sm:text-base font-normal text-dark-gray">In-Clinic Visit</span>
                      <span class="material-symbols-outlined">
                          keyboard_arrow_down
                      </span>
                  </button>

                  <ul class="dropdown-menu hidden absolute z-20 mt-1 w-1/2 bg-white border border-primary-blue rounded shadow text-sm sm:text-base text-dark-gray font-normal h-40 overflow-y-auto scroll">
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">In-Clinic Visit</li>
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Phone Consult</li>
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Home Visit</li>
                      <li class="dropdown-item px-3 py-2 hover:bg-premium-light-blue cursor-pointer">Notification log</li>
                  </ul>
              </div>
          </div>

          <!-- Price -->
          <div>
              <label class="text-base sm:text-lg text-jet-black font-semibold">Price</label>
              <input type="text"
                  class="w-full border border-slate-gray rounded-md px-3 py-3 mt-2 focus:outline-none"
                  value="₹ 0.00">
          </div>
      </div>
  </div>
`;

$(document).on('click', '.add-service-visit', function () {
  const stepContent = $(this).closest('.step-content');
  stepContent.find('.visit-services-list').append(visitServiceCardTemplate());
});

$(document).on('click', '.remove-service-visit', function () {
  $(this).closest('.service-card').remove();
});


/* ---------------- OPEN FILE MANAGER ---------------- */
$(document).on('click', '.upload-btn, .upload-box', function (e) {
    e.stopPropagation();
    $(this).closest('.file-upload-wrapper').find('.file-input').trigger('click');
});

$(document).on('change', '.file-input', function () {
    const wrapper = $(this).closest('.file-upload-wrapper');
    const file = this.files[0];

    if (!file) return;

    wrapper.find('.file-name').text(file.name);
    wrapper.find('.remove-file').removeClass('hidden');

    // Enable submit
    wrapper.find('.submit-btn')
        .prop('disabled', false)
        .removeClass('bg-light-gray cursor-not-allowed')
        .addClass('bg-primary-blue text-white');
});

$(document).on('click', '.remove-file', function (e) {
    e.stopPropagation();

    const wrapper = $(this).closest('.file-upload-wrapper');

    // Reset input
    wrapper.find('.file-input').val('');

    // Reset UI
    wrapper.find('.file-name').text('Upload CSV File');
    $(this).addClass('hidden');

    // Disable submit again
    wrapper.find('.submit-btn')
        .prop('disabled', true)
        .removeClass('bg-primary-blue text-white')
        .addClass('bg-light-gray cursor-not-allowed');
});


/* -------- MORE BUTTON HANDLER -------- */
$(document).on('click', '.more-btn', function (e) {
    e.stopPropagation();

    const card = $(this).closest('.service-card');

    // Close other open dropdowns
    $('.more-dropdown').not(card.find('.more-dropdown')).addClass('hidden');

    // Toggle current dropdown
    card.find('.more-dropdown').toggleClass('hidden');
});

$(document).on('click', function () {
    $('.more-dropdown').addClass('hidden');
});

$(document).on('click', '.delete-btn', function () {
    const card = $(this).closest('.service-card');
    card.remove();
});

$(document).on('click','.home-add-service', function () {
  $('.services-section').removeClass('hidden');
  $('.home-section').addClass('hidden')
  goToStep(1);
});

$(document).on('click', '#cancel-steps', function () {
  $('.services-section').addClass('hidden');
  $('.home-section').removeClass('hidden')
});