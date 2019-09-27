var data = (function () {
    let person;

    var loadJson = function () {
        $.getJSON("data/data.json", function (json) {
            person = json;
            bindOverview();
            bindLifeStory();
            bindCompetency();
            bindAbout();
        });
    }

    var bindOverview = function () {
        $('#overview .svg').load('images/vector/SVG/tech.svg');
        $('#full-name').html(person.firstName + ' - ' + person.surName);
        $('#title').html(person.title);
        $('#summary').html(person.summary);
        person.personality.forEach(function (item, index) {
            let string = '<div class="hashtag-item anime">' + item + '</div>';
            $('#personality').append(string);
        });
        $('#quote').html(person.quote);
    }

    var bindLifeStory = function () {
        let side = '';
        let i = 1;
        let template = '<div id="life-{i}" class="row year-{side}"> \
            <div class="out-100 flex-start">\
                <div class="line">\
                </div>\
            </div>\
            <div class="out-50-year">\
                <div class="year">{year}</div>\
            </div>\
            <div class="out-50-content">\
                <div class="title">\
                    {title}\
                    </div>\
                <div class="break">\
                    <div class="dot"></div>\
                </div>\
                <div class="detail">{content}\
                    </div>\
            </div>\
            <div class="out-100">\
                <div class="circle-out">\
                </div>\
            </div>\
            <div class="out-100">\
                <div class="circle">\
                    <i class="{icon}"></i>\
                </div>\
            </div>\
        </div>';

        person.milestone.forEach(function (item, index) {
            side = (i % 2 == 0) ? 'left' : 'right';
            let string = template.replace('{i}', i).replace('{side}', side).replace('{year}', item.year).replace('{title}', item.title).replace('{content}', item.content).replace('{icon}', item.icon);
            $('#life-story .slider-container').append(string);
            i++;
        });
    }

    var bindCompetency = function () {
        let currentTime = new Date();
        let startYear = new Date('01/' + person.experience[0].start);
        let roles = [];
        let projects = 0;

        G_TechDataSet = calProgram();
        G_Year = currentTime.getYear() - startYear.getYear();
        
        person.experience.forEach(function (item, index) {
            if (!roles.includes(item.title))
                roles.push(item.title);
            projects += item.projects;
        });
        G_Role = roles.length;
        G_Project = projects;
        person.foreignLanguage.forEach(function (item, index) {
            if (item.degree == 'TOEIC')
                G_TOEIC = item.score;
            else if (item.degree == 'JLPT')
                G_JLPT = item.score;
        });
        G_CERT = person.certification.length;

        person.competency.forEach(function (item, index) {
            let string = '<div class="hashtag-item anime">' + item + '</div>';
            $('#core-competency').append(string);
        });

        person.frameworkOrPlatform.forEach(function (item, index) {
            let string = '<img src="' + item.icon + '" class="icon anime" />';
            $('#framework-platform').append(string);
        });

        person.honor.forEach(function (item, index) {
            let string = '<div class="item outline"><i class="fa fa-award" ></i> ' + item.name + ' - ' + item.year + '</div >';
            $('#achievement').append(string);
        });

        person.certification.forEach(function (item, index) {
            let string = '<div class="item outline"><i class="fa fa-certificate" ></i> ' + item.name + ' - ' + item.year + '</div >';
            $('#achievement').append(string);
        });
    }

    var bindAbout = function () {
        $('#resume').html('<i class="fa fa-download"></i><a href = "' + person.cv + '" target = "_blank" > Curriculum vitae</a>');
        $('#facebook').html('<i class="fab fa-facebook-square"></i><a href = "https://www.facebook.com/' + person.facebook.name + '" target = "_blank" > ' + person.facebook.displayName + '</a>');
        $('#tel').html('<i class="fa fa-phone"></i><a href = "tel:' + person.tel + '" > ' + person.tel + '</a>');
        $('#email').html('<i class="fa fa-envelope"></i><a href = "mailto:' + person.email + '" > ' + person.email + '</a>');
        $('#address').html('<i class="fa fa-map-marked"></i><a href = "https://www.google.com/maps/search/?api=1&query=' + person.address.lattitude + ',' + person.address.longitude + '" target = "_blank" > ' + person.address.location + '</a>');
    }

    var calProgram = function () {
        let labels = [], data = [], color = [], i = 0;
        person.experience.forEach(function (item, index) {
            let start = new Date('01/' + item.start);
            let end = (item.end !== 'present') ? new Date('01/' + item.end) : new Date();
            let duration = monthDiff(start, end);

            person.programingLanguage.forEach(function (program, index) {
                if (item.technology.includes(program.name)) {
                    program.year += duration;
                }
            });
        });
        person.programingLanguage.forEach(function (program, index) {
            labels.push(program.name);
            data.push(program.year);
            color.push(G_BackgroundColor[i]);
            i++;
        });

        return {
            labels: labels,
            data: data,
            backgroundColor: color
        };
    }

    var monthDiff = function (d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    return {
        callLoadJson: function () {
            loadJson();
        }
    };
})();
