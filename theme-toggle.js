let body = $(document.body);
let toggle = $('input[data-theme-toggle]');
let colorScheme;


function Main() {
    if (sessionStorage.getItem('color-scheme')) {
        colorScheme = sessionStorage.getItem('color-scheme');
    } else {
        colorScheme = GetPrefersColorScheme();
    }

    SetTheme(colorScheme);

    toggle.val(GetThemeToggleValue(colorScheme));
}

function UpdateTheme() {
    colorScheme = GetColorScheme(toggle.val());

    SetTheme(colorScheme);
    sessionStorage.setItem('color-scheme', colorScheme);
}

function SetTheme(scheme) {
    body.attr('data-color-scheme', scheme);
}

function GetPrefersColorScheme() {
    let scheme = '';
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
    if (prefersDarkTheme.matches) {
        scheme = 'dark';
    } else if (prefersLightTheme.matches) {
        scheme = 'light';
    }

    return scheme;
}

function GetColorScheme(value) {
    let scheme = '';

    if (value == '1') {
        scheme = 'dark';
    } else if (value == '2') {
        scheme = 'light';
    } else if (value == '3') {
        scheme = 'alt';
    }
    
    return scheme;
}

function GetThemeToggleValue(scheme) {
    let value;

    if (scheme == 'dark') {
        value = '1';
    } else if (scheme == 'light') {
        value = '2';
    } else if (scheme == 'alt') {
        value = '3';
    }
    
    return value;
}