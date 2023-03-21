interface IWeather {
    [key:string]: {
        data: string;
        temp_max: number;
        temp_min: number;
        description: number;
    };
}

interface IAction {
    type: string,
    payload: any,
}

interface IStateModal {
    modal?: {
        isOpen: string
    }
}

interface IStateCity {
    city?: {
        cities: string
    }
}

interface IStateDay {
    day?: {
        day: string
    }
}