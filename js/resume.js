$(function () {
    let person;
    var loadJson = function () {
        $.getJSON("data/data.json", function (json) {
            person = json;
            bindData();
        });
    }

    var bindData = function () {
        let architecture = '<ul>';
        let programming = '<ul>';
        let platform = '<ul>';
        let database = '<ul>';
        let english = '<ul>';
        let japanese = '<ul>';

        $('#full-name').html(person.firstName + ' - ' + person.surName);
        $('#title').html(person.title);
        $('#summary').html(person.summary);
        person.competency.forEach(function (item, index) {
            let string = '<div class="hashtag-item">' + item + '</div>';
            $('#core-competency').append(string);
        });
        $('#address').html('<a href = "https://www.google.com/maps/search/?api=1&query=' + person.address.lattitude + ',' + person.address.longitude + '" target = "_blank" > ' + person.address.location + '</a>');
        $('#tel').html('<a href = "tel:' + person.tel + '" > ' + person.tel + '</a>');
        $('#email').html('<a href = "mailto:' + person.email + '" > ' + person.email + '</a>');
        $('#website').html('<a href = "' + person.website + '" target = "_blank" > ' + person.website + '</a>');
        $('#education').html('<div class="content-out"><div class="title col-80">' + person.education.degree + ' of ' + person.education.field + '</div><div class="year col-20">' + person.education.start + '-' + person.education.end + '</div><div class="title col-100">' + person.education.school + '</div></div>');
        for (i = person.experience.length - 1; i >= 0; i--) {
            $('#experience').append(expString(person.experience[i]));
        }
        person.architecture.forEach(function (item, index) {
            architecture += '<li> ' + item + '</li>';

        });
        $('#architecture').html(architecture + '</ul>');
        person.programingLanguage.forEach(function (item, index) {
            programming += '<li> ' + item.name + '</li>';

        });
        $('#programming').html(programming + '</ul>');
        person.frameworkOrPlatform.forEach(function (item, index) {
            platform += '<li> ' + item.name + '</li>';

        });
        $('#platform-framework').html(platform + '</ul>');
        person.database.forEach(function (item, index) {
            database += '<li> ' + item.name + '</li>';

        });
        $('#database').html(database + '</ul>');
        person.honor.forEach(function (item, index) {
            let string = '<div class="title col-100">' + item.name + ' - ' + item.year + '</div>';
            $('#achievement').append(string);
        });
        person.certification.forEach(function (item, index) {
            let string = '<div class="title col-100">' + item.name + ' - ' + item.year + '</div>';
            $('#achievement').append(string);
        });
        person.foreignLanguage.forEach(function (item, index) {
            if (item.name == 'English')
                english += '<li> ' + item.degree + ': ' + item.score + '</li>';
            else if (item.name == 'Japanese')
                japanese += '<li> ' + item.degree + ': N' + item.score + '</li>';

        });
        $('#english').append(english);
        $('#japanese').append(japanese);
    }

    var expString = function (exp) {
        let template = '<div class="content-out">\
            <div class="title col-75" >{title}</div>\
                <div class="year col-25">{year}</div>\
                <div class="title col-75">\
                    {company}\
                        </div>\
                <div class="year col-25">\
                    {project}\
                        </div>\
                <div class="overview col-100">\
                    {overview}\
                        </div>\
                <div class="detail col-100">\
                    {detail}\
                </div>\
                    </div >';
        let overview = '';
        let responsibility = '<ul>';

        exp.responsibility.forEach(function (item, index) {
            responsibility += '<li> ' + item + '</li>';
        });
        responsibility += '</ul>';

        overview += '<div class="overview-item"> ' + exp.market + '</div>';
        overview += '<div class="overview-item"> ' + exp.model + '</div>';
        exp.technology.forEach(function (item, index) {
            overview += '<div class="overview-item"> ' + item + '</div>';
        });

        return template.replace('{title}', exp.title).replace('{year}', exp.start + ' - ' + exp.end).replace('{company}', exp.company).replace('{detail}', responsibility).replace('{overview}', overview).replace('{project}', exp.projects + ' projects');
    }

    loadJson();
});
