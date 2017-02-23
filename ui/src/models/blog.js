export default {
    all: () => {
        fetch('/api/blogs')
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(stories) {
                console.log(stories);
            });
    }
}
