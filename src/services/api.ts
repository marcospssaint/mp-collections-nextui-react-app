interface Response {
    data: {
       status: number;
       username: string;
    };
}

export function post(user: any): Promise<Response> {
    const {
        REACT_APP_USERNAME
    } = process.env;

    return new Promise((resolve) => {
        var usernames = REACT_APP_USERNAME?.split(',');

        resolve({
            data: {
                status: usernames?.some((u) => user?.name === u) ? 200 : 404,
                username: user.name
            },
        });
    });
}