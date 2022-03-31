window.addEventListener('DOMContentLoaded', function () {
  scheduler.locale.labels.timeline_tab = 'Timeline'
  scheduler.locale.labels.section_custom = 'Section'
  scheduler.config.details_on_create = true
  scheduler.config.details_on_dblclick = true

  //===============
  //Configuration
  //===============


  var event_ids = null

  scheduler.attachEvent('onContextMenu', function (
    event_id,
    native_event_object,
  ) {
    event_ids = event_id
    if (event_id) {
      menu.showAt(native_event_object)
      return false // prevent default action and propagation
    }
    return true
  })

  scheduler.serverList('bookingStatuses', [
    { key: '1', label: 'Check in' },
    { key: '2', label: 'Confirmed' },
    { key: '3', label: 'Arrived' },
    { key: '4', label: 'Checked Out' },
  ])

  scheduler.serverList('roomTypes', [
    { key: '1', label: 'Single' },
    { key: '2', label: 'Double' },
    { key: '3', label: 'Triple' },
  ])

  scheduler.serverList('roomStatuses', [
    { key: '1', label: 'Ready' },
    { key: '2', label: 'Dirty' },
  ])

  var hotel1 = [
    // original hierarhical array to display
    {
      key: 10,
      label: '',
      type: 1,
      status: 1,
      open: true,
      children: [
        { key: 20, label: '101', type: 1, status: 1 },
        { key: 30, label: '102', type: 1, status: 1 },
        { key: 40, label: '103', type: 1, status: 2 },
        { key: 50, label: '104', type: 1, status: 2 },
        { key: 60, label: '105', type: 1, status: 1 },
        { key: 70, label: '106', type: 1, status: 2 },
        { key: 80, label: '107', type: 1, status: 1 },
      ],
    },
    {
      key: 100,
      label: '',
      type: 2,
      status: 1,
      open: true,
      children: [
        { key: 110, label: '201', type: 2, status: 1 },
        { key: 120, label: '202', type: 2, status: 1 },
        { key: 130, label: '203', type: 2, status: 2 },
        { key: 140, label: '204', type: 2, status: 2 },
        { key: 150, label: '205', type: 2, status: 1 },
      ],
    },
    {
      key: 200,
      label: '',
      type: 3,
      status: 1,
      open: true,
      children: [
        { key: 210, label: '301', type: 3, status: 1 },
        { key: 220, label: '302', type: 3, status: 1 },
        { key: 230, label: '303', type: 3, status: 1 },
        { key: 240, label: '304', type: 3, status: 2 },
        { key: 250, label: '305', type: 3, status: 2 },
        { key: 260, label: '306', type: 3, status: 1 },
      ],
    },
  ]

  var hotel2 = [
    // original hierarhical array to display
    {
      key: 2210,
      label: '',
      type: 1,
      status: 1,
      open: true,
      children: [
        { key: 2220, label: '1101', type: 1, status: 1 },
        { key: 2230, label: '1102', type: 1, status: 2 },
        { key: 2240, label: '1103', type: 1, status: 2 },
        { key: 2250, label: '1104', type: 1, status: 1 },
      ],
    },
    {
      key: 22100,
      label: '',
      type: 2,
      status: 1,
      open: true,
      children: [
        { key: 22110, label: '1201', type: 2, status: 1 },
        { key: 22120, label: '1202', type: 2, status: 2 },
        { key: 22130, label: '1203', type: 2, status: 1 },
      ],
    },
    {
      key: 22200,
      label: '',
      type: 3,
      status: 1,
      open: true,
      children: [
        { key: 22210, label: '1301', type: 3, status: 1 },
        { key: 22220, label: '1302', type: 3, status: 1 },
        { key: 22230, label: '1303', type: 3, status: 1 },
      ],
    },
  ]

  var hotel3 = [
    // original hierarhical array to display
    {
      key: 1110,
      label: '',
      type: 1,
      status: 1,
      open: true,
      children: [
        { key: 1120, label: '2101', type: 1, status: 1 },
        { key: 1130, label: '2102', type: 1, status: 1 },
        { key: 1140, label: '2103', type: 1, status: 1 },
      ],
    },
    {
      key: 11100,
      label: '',
      type: 2,
      status: 1,
      open: true,
      children: [
        { key: 11110, label: '2201', type: 2, status: 1 },
        { key: 11120, label: '2202', type: 2, status: 2 },
        { key: 11130, label: '2203', type: 2, status: 2 },
      ],
    },
    {
      key: 11200,
      label: '',
      type: 3,
      status: 1,
      open: true,
      children: [
        { key: 11210, label: '2301', type: 3, status: 1 },
        { key: 11220, label: '2302', type: 3, status: 1 },
        { key: 11230, label: '2303', type: 3, status: 1 },
      ],
    },
  ]

  var hotel = scheduler.serverList('hotels', hotel1)

  scheduler.createTimelineView({
    section_autoheight: false,
    name: 'timeline',
    x_unit: 'day',
    x_date: '%j',
    x_step: 1,
    x_size: 31,
    x_start: 1,
    x_length: 24,
    y_unit: scheduler.serverList('hotels'),
    cell_template: true,
    y_property: 'section_id',
    render: 'tree',
    event_dy: 'full',
    dy: 60,
    second_scale: {
      x_unit: 'month',
      x_date: '%F, %Y',
    },
  })

  //===============
  //Data loading
  //===============

  scheduler.config.lightbox.sections = [
    {
      map_to: 'text',
      name: 'Booking',
      height: 50,
      type: 'textarea',
      focus: true,
    },
    {
      name: 'Room',
      height: 30,
      type: 'timeline',
      options: null,
      map_to: 'section_id',
    }, //type should be the same as name of the tab
    {
      map_to: 'status',
      name: 'Status',
      height: 40,
      type: 'radio',
      options: scheduler.serverList('bookingStatuses'),
    },
    {
      map_to: 'is_paid',
      name: 'Paid',

      height: 40,
      type: 'checkbox',
      checked_value: true,
      unchecked_value: false,
    },
    { map_to: 'time', name: 'Date', height: 50, type: 'calendar_time' },
  ]

  scheduler.attachEvent('onEventCreated', function (event_id) {
    var ev = scheduler.getEvent(event_id)
    ev.status = 1
    ev.is_paid = false
    ev.text = 'New Booking'
  })

  var headerHTML =
    "<div class='timeline_item_separator'></div>" +
    "<div class='timeline_item_parent'>Type</div>" +
    "<div class='timeline_item_separator'></div>" +
    "<div class='timeline_item_parent'>Number</div>" +
    "<div class='timeline_item_separator'></div>" +
    "<div class='timeline_item_parent room_status' id='timeline_status_col'>Status</div>"

  scheduler.locale.labels.timeline_scale_header = headerHTML

  scheduler.attachEvent('onTemplatesReady', function () {
    function findInArray(array, key) {
      for (var i = 0; i < array.length; i++) {
        if (key == array[i].key) return array[i]
      }
      return null
    }

    function getRoomType(key) {
      return findInArray(scheduler.serverList('roomTypes'), key).label
    }

    function getRoomStatus(key) {
      return findInArray(scheduler.serverList('roomStatuses'), key)
    }

    function getRoom(key) {
      return findInArray(scheduler.serverList('rooms'), key)
    }

    scheduler.templates.timeline_scale_label = function (key, label, section) {
      var roomStatus = getRoomStatus(section.status)

      if (label === '')
        return [
          "<div class='timeline_item_room'>" +
            getRoomType(section.type) +
            '</div>',
        ].join('')
      return [
        "<div class='timeline_item_separator'></div>",
        "<div class='timeline_item_cell'>" +
          getRoomType(section.type) +
          '</div>',
        "<div class='timeline_item_separator'></div>",
        "<div class='timeline_item_cell'>" + label + '</div>',
        "<div class='timeline_item_separator'></div>",
        "<div class='timeline_item_cell' id='status_" +
          (section.status === 1 ? "ready'>" : "dirty'>") +
          roomStatus.label +
          '</div>',
      ].join('')
    }

    scheduler.templates.timeline_cell_value = function folderCellContent(
      evs,
      date,
      section,
    ) {
      if (section.children) {
        var count = 0
        for (var i = 0; i < hotel.length; i++) {
          if (hotel[i].key === section.key) {
            count = hotel[i].children.length
            break
          }
        }
        var timeline = scheduler.getView()

        var events = timeline.selectEvents({
          section: section.key,
          date: date,
          selectNested: true,
        })
        count = count - events.length
        if (!count) {
          className = 'load-marker-high'
        } else {
          className = 'load-marker-light'
        }

        return "<div class='load-marker " + className + "'>" + count + '</div>'
      }
      return ''
    }

    scheduler.templates.event_class = function (start, end, event) {
      return 'event_' + (event.status || '')
    }

    function getBookingStatus(key) {
      var bookingStatus = findInArray(
        scheduler.serverList('bookingStatuses'),
        key,
      )
      return !bookingStatus ? '' : bookingStatus.label
    }

    function getPaidStatus(isPaid) {
      return isPaid ? 'paid' : 'not paid'
    }

    var eventDateFormat = scheduler.date.date_to_str('%Y %M %d')

    scheduler.templates.event_bar_text = function (start, end, event) {
      var paidStatus = getPaidStatus(event.is_paid)
      var startDate = eventDateFormat(event.start_date)
      var endDate = eventDateFormat(event.end_date)
      return [
        event.text + '<br />',
        startDate + ' - ' + endDate,
        "<div class='booking_status booking-option'>" +
          getBookingStatus(event.status) +
          '</div>',
        "<div class='booking_paid booking-option'>" + paidStatus + '</div>',
      ].join('')
    }

    scheduler.templates.tooltip_text = function (start, end, event) {
      var html = []
      html.push('Booking: <b>' + event.text + '</b>')
      html.push('Check-in: <b>' + eventDateFormat(start) + '</b>')
      html.push('Check-out: <b>' + eventDateFormat(end) + '</b>')
      html.push(
        getBookingStatus(event.status) + ', ' + getPaidStatus(event.is_paid),
      )
      return html.join('<br>')
    }

    scheduler.templates.lightbox_header = function (start, end, ev) {
      var formatFunc = scheduler.date.date_to_str('%Y.%m.%d')
      return formatFunc(start) + ' - ' + formatFunc(end)
    }
  })

  window.getCurDate = function getCurDate() {
    var date = new Date()
    if (date.getDate() > 7) date.setDate(date.getDate() - 7)
    else {
      date.setDate(date.getDate() + 31 - 7)
      if (date.getMonth() > 1) date.setMonth(data.getMonth() - 1)
      else {
        date.setMonth(12)
        date.setFullYear(date.getFullYear() - 1)
      }
    }
    return date
  }

  scheduler.attachEvent('onEventCollision', function (ev, evs) {
    dhtmlx.message({
      type: 'error',
      text: 'This room is already booked for this date.',
    })

    return true
  })

  scheduler.init('scheduler_here', getCurDate(), 'timeline')

  window.showHotels = function showHotels(type) {
    if (type == 'Hotel 1') hotel = hotel1
    if (type == 'Hotel 2') hotel = hotel2
    if (type == 'Hotel 3') hotel = hotel3
    scheduler.updateCollection('hotels', hotel)
  }
})


$(document).ready(function(){
  makeTotalRoomCount();

  $(window).on('resize', function(){
    makeTotalRoomCount();
  });

});
function makeTotalRoomCount(){
  let roomText = '<div class="text">Total room</div>';
  let roomCounts = $('<div><div class="room-content"></div></div>');
  
  let cellCount = 0;
  $("div.dhx_scale_bar").each(function(){
    if (!$(this).hasClass('dhx_second_scale_bar')){
      cellCount++;
      const cellWidth = Math.round(parseFloat($(this).css("width")));
      let cell = '<div class="total-dailyRooms" style="width:' + cellWidth + 'px" index="' + cellCount + '">0</div>';
      roomCounts.find('.room-content').append($(cell));
    }
  });
  console.log(cellCount);
  let totalRoomDiv = '<div class="total-rooms">' + roomText + roomCounts.html() + '</div>';
  $("div#scheduler_here").find("div.total-rooms").remove();
  $("div#scheduler_here").append($(totalRoomDiv));
  getTotalRoomCount($("div.total-rooms div.room-content"));
}
function getTotalRoomCount(target){
  target.find("div.total-dailyRooms").html("0");
  $("div.load-marker").each(function(){
    let dailyIndex = parseInt($(this).parent().parent().attr('data-col-id')) + 1;
    let dailyRoomCount = parseInt($(this).html());
    let dailyTotalEle = target.find('div[index='+dailyIndex+']');
    dailyTotalEle.html(parseInt(dailyTotalEle.html()) + dailyRoomCount);
  });
}