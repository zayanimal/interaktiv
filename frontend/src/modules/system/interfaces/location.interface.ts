export interface Path {
    pathname: string;
}

interface LocationState {
    from: Path;
}

export interface Location {
    pathname: string;
    search: string;
    state: LocationState;
    hash: string;
    key?: string;
}
