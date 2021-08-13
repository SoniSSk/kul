const setInitialState = (store: any, data: any) => {
    if (data) {
        store.setState(JSON.parse(data).state);
    }
};

export default setInitialState;