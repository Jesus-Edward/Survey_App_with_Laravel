export const getResponseError = (error) => {

    if (error === null || error === undefined) {

        return null;

    }

    if (error.response) {
        
        if (error.response.status === 422 && error.response.data) {

            const responseError = error.response.data.errors;

            if (responseError && Array.isArray(responseError)) {

                const errorData = {};

                for(const errorItem of responseError) {

                    errorData[errorItem.field] = errorItem
                    message;
                }

                return errorData;
            }

            return error.response.data.errors;
        }
    }
}
