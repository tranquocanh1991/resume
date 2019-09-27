var G_IsSlide = false, G_Page = -1, G_Welcome = true, G_XItem = 20, G_YItem = 20;
var G_TL, G_CurrentPage, G_NextPage, G_Spaceship, G_SpaceshipPath, G_Background, G_BackgroundTL;
var G_PageIDs = [
    { id: "#welcome", isSlide: 0, beginFunc: "animateWelcomeBegin", endFunc: "animateWelcomeEnd" },
    { id: "#overview", isSlide: 0, beginFunc: "animateOverviewBegin", endFunc: "animateOverviewEnd" },
    { id: "#life-story", isSlide: 0, beginFunc: "animateLifeBegin", endFunc: "animateLifeEnd" },
    { id: "#competency", isSlide: 0, beginFunc: "animateCompetencyBegin", endFunc: "animateCompetencyEnd" },
    { id: "#about", isSlide: 0, beginFunc: "animateAboutBegin", endFunc: "animateAboutEnd" },
    { id: "#goodbye", isSlide: 0, beginFunc: "animateGoodbyeBegin", endFunc: "animateGoodbyeEnd" },
];
var G_SlideClass = { inactive: "frame-inactive", preactive: 'frame-preactive', active: 'frame-active' };
var G_AnimeMoon, G_AnimeEarth, G_AnimeAstronaut;
var G_TechDataSet;
var G_Year, G_Project, G_Role, G_TOEIC, G_JLPT, G_CERT;
const G_BackgroundColor = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
];