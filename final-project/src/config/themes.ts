interface ButtonTheme {
    secondary: string;
    secondaryHover: string;
}

interface theme {
    button: ButtonTheme;
    drawerBg: string;
    mainBg: string;
    appbarText: string;
    drawerText: string;
    newCol: string;
    appBarBorder: string;
    taskHover:string;
    bg: {
        buttonPrimary: string;
        buttonPrimaryHover: string;
        buttonDestructive: string;
        buttonDestructiveHover: string;
    };
    text: {
        buttonPrimary: string;
        buttonSecondary: string;
        buttonDestructive: string;
    };
    modal: {
        headers: string
    };
}

interface Themes {
    light: theme;
    dark: theme;
    [key: string]: theme;
}

export const themes: Themes = {
    light: {
        button: {
            secondary: "#f0effa",
            secondaryHover: "#d8d7f1"
        },
        bg: {
            buttonPrimary: "#635FC7",
            buttonPrimaryHover: "#A8A4FF",
            buttonDestructive: "#EA5555",
            buttonDestructiveHover: "#FF9898",
        },
        text: {
            buttonPrimary: "white",
            buttonSecondary: "#635FC7",
            buttonDestructive: "white",
        },
        modal: {
            headers: "#828FA3"
        },
        taskHover:"rgb(240, 240, 250)",
        newCol: "#eaf0fb",
        drawerBg: "white",
        mainBg: "#f4f7fd",
        appbarText: "black",
        drawerText: "#828FA3",
        appBarBorder: "#e4ebfa"
    },
    dark: {
        button: {
            secondary: "white",
            secondaryHover: "white",
        },
        bg: {
            buttonPrimary: "#635FC7",
            buttonPrimaryHover: "#A8A4FF",
            buttonDestructive: "#EA5555",
            buttonDestructiveHover: "#FF9898",
        },
        text: {
            buttonPrimary: "white",
            buttonSecondary: "#635FC7",
            buttonDestructive: "white",
        },
        modal: {
            headers: "white"
        },
        newCol: "#23242e",
        drawerBg: "#2b2c37",
        mainBg: "#20212c",
        appbarText: "white",
        drawerText: "#828FA3",
        appBarBorder: "#3e3f4e",
        taskHover:"rgb(50, 50, 60)"
    }
};
