(function () {
  // Localize jQuery variable

  var jQuery;

  showMobile = true;

  if (0 == 0 && window.innerWidth < 768) showMobile = true;

  /******** Load jQuery if not present *********/

  if (typeof jQuery == "undefined") {
    var script_tag = document.createElement("script");

    script_tag.setAttribute("type", "text/javascript");

    script_tag.setAttribute(
      "src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"
    );

    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () {
        // For old versions of IE

        if (this.readyState == "complete" || this.readyState == "loaded") {
          scriptLoadHandler();
        }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }

    // Try to find the head, otherwise default to the documentElement

    (
      document.getElementsByTagName("head")[0] || document.documentElement
    ).appendChild(script_tag);
  } else {
    // The jQuery version on the window is the one we want to use

    jQuery = window.jQuery;
  }

  /******** Called once jQuery has loaded ******/

  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the

    // new jQuery in our local jQuery variable

    jQuery = window.jQuery.noConflict(true);

    // Call our main function

    if (typeof loaded == "undefined") {
      main();

      loaded = true;
    }
  }

  /* String Parameter */

  /******** Our main function ********/

  function main() {
    jQuery(document).ready(function () {
      jQuery("head").append('<meta charset="UTF-8">');

      if (lang == "tr") {
        selecthotel = "Oteller";

        rezlabel = "Rezervasyon";

        checkin = "Giriş Tarihi";

        checkout = "Çıkış Tarihi";

        adult = "Yetişkin";

        child = "Çocuk";

        age = "Yaş";

        childok = "Uygula";

        night = "Gece";
      }

      if (lang == "en") {
        selecthotel = "Hotels";

        rezlabel = "Reservation";

        checkin = "Check-in";

        checkout = "Check-out";

        adult = "Adult";

        child = "Child";

        age = "Age";

        childok = "Apply";

        night = "Night";

      }



      if (lang == "ru") {
        selecthotel = "Отели";

        rezlabel = "Бронирование";

        checkin = "Регистрироваться";

        checkout = "Проверить";

        adult = "Взрослый";

        child = "Ребенок";

        age = "Возраст";

        childok = "Применять";

        night = "ночь";

      }


      if (lang == "de") {
        selecthotel = "Hotels";

        rezlabel = "Buchen";

        checkin = "Check-In";

        checkout = "Check-Out";

        adult = "Erwachsene";

        child = "Kinder";

        age = "Zeitalter";

        childok = "Anwenden";

        night = "Nacht";
      }

      if (lang == "az") {
        selecthotel = "Otellər";
        rezlabel = "Rezervasyon";
        checkin = "Giriş tarixi";
        checkout = "Gediş tarixi";
        adult = "Yetkin";
        child = "Uşaq";
        age = "Yaş";
        childok = "Müraciət edin";
        night = "gecə";
      }


      /******* Load CSS *******/

      var css_link = jQuery("<link>", {
        rel: "stylesheet",

        type: "text/css",

        href:
          "https://www.rezervasyonal.com/widget/widgetbar/assets/widget.css",

      });

      css_link.appendTo("head");

      /******* Load CSS *******/

      var css_link = jQuery("<link>", {
        rel: "stylesheet",

        type: "text/css",

        href:
          "https://fonts.googleapis.com/css?family=Abel|Cairo|Dosis|Open+Sans+Condensed:300|PT+Sans+Narrow|Rajdhani|Roboto|Roboto+Condensed|Saira+Semi+Condensed|Teko&display=swap",
      });

      css_link.appendTo("head");

      /******* Load CSS *******/

      var hotels = "";

      if (grouphotels == true) {
        hotels =
          "  <div class='elektraweb-formGroup elektraweb-hotels-area'><div class='groupHotels'><label>" +
          selecthotel +
          "</label><select id='elektraweb-hotels'>";

        jQuery.each(grouphotelsdata, function (i, val) {
          hotels +=
            "<option value='" + val.adress + "' data-name='" + val.name + "'>" + val.name + "</option>";
        });

        hotels += "</select></div></div>";
      }

      /******* Load HTML *******/

      var date = new Date();

      var tomorrow = new Date(date);



      roomTypeGorupIdHtml = "";
      if (typeof RoomTypeGroupId != 'undefined') {
        if (RoomTypeGroupId != "") {
          roomTypeGorupIdHtml = `<input type="hidden" name="RoomTypeGroupId" value="${RoomTypeGroupId}">`;
        }
      }


      RoomTypeIdHtml = "";
      if (typeof RoomTypeId != 'undefined') {
        if (RoomTypeId != "") {
          RoomTypeIdHtml = `<input type="hidden" name="RoomTypeId" value="${RoomTypeId}">`;
        }
      }


      if (typeof defaultadultcount == 'undefined') {
        defaultadultcount = 2;
      }


      if (typeof nightselect == 'undefined') {
        nightselect = false;
      }


      Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
      };


      date.setHours(date.getHours() + 3);
      tomorrow.setHours(tomorrow.getHours() + 3);
      tomorrow.setDate(tomorrow.getDate() + 1);
      nightOptions = "";
      for (let index = 1; index <= 20; index++) {
        nightOptions += "<option value='" + index + "'>" + index + "</option>";

      }


      nightArea = "";
      if (nightselect == true) {
        nightArea = `
      <div class="elektraweb-formGroup">
      <label>${night}</label>
            <select style="width:auto;" id="nightSelect">
                ${nightOptions}
            </select>
 </div>`;
      }



      jQuery("#elektraweb-widget-area").append(`

    

                        <form id="widgetform" method="GET" action="${widgeturl}" target="_blank">  

                        <input type="hidden" name="currency" value="${currency}">

            <input type="hidden" name="language" value="${lang}">   
            ${roomTypeGorupIdHtml}
            ${RoomTypeIdHtml}                 

    <div class="elektraweb-widget">
      <div class="elektraweb-main">
      ${hotels}
     <div class="elektraweb-formGroup">

     <label>${checkin}</label>

     <input type="date"  min='${date

          .toISOString()

          .substr(
            0,

            10
          )}' format="DD-MM-YYYY" name="Checkin" placeholder="GiriÅŸ Tarihi" id="checkin" style="cursor: pointer;">

     </div>



     <div class="elektraweb-formGroup">
     <label>${checkout}</label>
     <input type="date" min='${tomorrow

          .toISOString()

          .substr(
            0,

            10
          )}'  format="DD-MM-YYYY" name="Checkout" placeholder="GiriÅŸ Tarihi" id="checkout" style="cursor: pointer;">

     </div>

     ${nightArea}
    




     <div class="elektraweb-formGroup">

     <label>${adult}</label>

     <button class="pluscss" id="adultcross">-</button>

     <input type="text" name="Adult" readonly id="adult" value="${defaultadultcount}">

     <button class="pluscss" id="adultplus">+</button>

     </div>


  



     <div class="elektraweb-formGroup" id="childGroup">

     <label>${child}</label>

     <button class="pluscss" id="childcross">-</button>

     <input type="text" readonly id="child" value="0">

     <button class="pluscss" id="childplus">+</button>

     <div id="childAream">

     <div id="childArea"></div>

     <button id="chillok">${childok}</button>

     </div>

     </div>



     <div class="elektraweb-formGroup">

     <button id="widgetSubmit" class="">

     

<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.cls-1{fill:#332e20;}</style></defs><path class="cls-1" d="M38,35.9l-7.33-7.34a10.65,10.65,0,1,0-2.13,2.13L35.9,38a1.49,1.49,0,0,0,1.06.44A1.53,1.53,0,0,0,38,38,1.51,1.51,0,0,0,38,35.9ZM16.78,27.59a7.67,7.67,0,1,1,5.4,2.23A7.64,7.64,0,0,1,16.78,27.59Z"/></svg>

     ${rezlabel}</button>

     </div>



  </div>



                   </form>  

    `);

      if (grouphotels == true) {
        jQuery("#widgetform").append(
          '<input type="hidden" name="Hotel" id="Hotel">'
        );

        if (document.getElementById('Hotel') != null) {
          document.getElementById('Hotel').value = document.getElementById('elektraweb-hotels')[0].dataset.name;
        }
      }

      var childageOptions;

      if (Array.isArray(maxchildage)) {
        for (let i = maxchildage[0]; i <= maxchildage[1]; i++) {
          childageOptions += `<option val="${i}">${i}</option>`;
        }
      } else {
        for (let i = 0; i <= maxchildage; i++) {
          childageOptions += `<option val="${i}">${i}</option>`;
        }
      }


      function nightCount() {
        let checkout = new Date(jQuery("#checkout").val());
        var checkinDate = new Date(jQuery("#checkin").val());
        var Difference_In_Time = checkout.getTime() - checkinDate.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        jQuery("#nightSelect").val(Difference_In_Days);
      }




      jQuery("#nightSelect").change(function () {
        night = jQuery(this).val();
        var currentDate = new Date(jQuery("#checkin").val());
        currentDate.addDays(night);

        jQuery("#checkout").val(currentDate.toISOString().substr(0, 10));


      });

      jQuery("#checkout").change(function () {
        nightCount();
      });


      jQuery("#checkin").change(function () {
        let checkout = new Date(jQuery("#checkout").val());
        var checkinDate = new Date(jQuery(this).val());
        nightCount();
        jQuery("#checkout").attr(
          "min",
          checkinDate.toISOString().substr(0, 10)
        );

        if (checkinDate > checkout) {
          checkinDate.setHours(checkinDate.getHours() + 3);
          checkinDate.setDate(checkinDate.getDate() + 1);
          jQuery("#checkout").val(checkinDate.toISOString().substr(0, 10));
        }



      });

      jQuery("#checkin").val(date.toISOString().substr(0, 10));

      jQuery("#checkout").val(tomorrow.toISOString().substr(0, 10));

      var options = "";

      for (let i = 0; i < maxchild; i++) {
        options += `

                <div class="childAgeGroup" id="childAgeGroup${i + 1
          }" style="display:none;">

                <label>${child} ${age} ${i + 1}</label>

                <select id="child${i + 1}">

                ${childageOptions}

                </select>

                </div>

                `;

        jQuery("#childArea").html(options);
      }

      jQuery("#adultplus").click(function (e) {
        e.preventDefault();

        var adult = jQuery("#adult");

        if (typeof (maxadult) == 'undefined') {
          if (adult.val() > 0) {
            adult.val(parseFloat(adult.val()) + 1);
          }
        } else {
          if (adult.val() > 0) {
            if (maxadult > adult.val()) {
              adult.val(parseFloat(adult.val()) + 1);
            }
          }
        }


      });

      jQuery("#elektraweb-hotels").change(function (e) {
        if (document.getElementById('Hotel') != null) {
          document.getElementById('Hotel').value = jQuery(this).find(':selected').attr('data-name')
        }
      });

      jQuery("#adultcross").click(function (e) {
        e.preventDefault();

        var adult = jQuery("#adult");

        if (adult.val() > 1) {
          adult.val(parseFloat(adult.val()) - 1);
        }
      });


      if (maxchild == 0) {
        jQuery("#childGroup").hide();
      }

      jQuery("#childplus").click(function (e) {
        e.preventDefault();
        var child = jQuery("#child");

        if (child.val() >= 0 && child.val() < maxchild) {
          child.val(parseFloat(child.val()) + 1);

          for (let index = 1; index <= child.val(); index++) {
            jQuery("#childAgeGroup" + index).show();

            jQuery("#childAream").show();
          }
        }
      });

      jQuery("#childcross").click(function (e) {
        e.preventDefault();

        var child = jQuery("#child");

        if (child.val() == 1) {
          jQuery("#childAream").hide();
        }

        if (child.val() > 0) {
          jQuery("#childAgeGroup" + child.val()).hide();

          child.val(parseFloat(child.val()) - 1);

          jQuery("#childAream").show();
        }
      });

      jQuery("#widgetSubmit").click(function () {
        var child = jQuery("#child");

        var ChildAges = "";

        for (var i = 1; i <= child.val(); i++) {
          jQuery("#child" + i).show();

          ChildAges += jQuery("#child" + i).val() + " ";
        }

        if (ChildAges.length > 0) {
          jQuery("#ChildAges").remove();

          jQuery("#widgetform").append(
            '<input type="hidden" name="ChildAges" id="ChildAges" value="">'
          );
        } else {
          jQuery("#ChildAges").remove();
        }

        jQuery("#ChildAges").val(ChildAges.substring(0, ChildAges.length - 1));

        jQuery("#widgetForm").submit();
      });

      jQuery("#elektraweb-hotels").change(function () {
        jQuery("#widgetform").attr("action", jQuery(this).val());
      });

      jQuery("#chillok").click(function (e) {
        event.preventDefault();

        jQuery("#childAream").hide();
      });

      jQuery("#child").click(function (e) {
        event.preventDefault();

        if (jQuery(this).val() > 0) {
          jQuery("#childAream").show();
        }
      });
    });
  }
})();
