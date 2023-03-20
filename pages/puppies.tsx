import Layout from "../components/layout";

const PuppiesPage = () => {
    return (
        <Layout pageTitle="Puppies">
            <h1>Puppies</h1>
            <p>Check out our available puppies:</p>
            <ul>
                <li>
                    <a href="#">Puppy 1</a>
                </li>
                <li>
                    <a href="#">Puppy 2</a>
                </li>
                <li>
                    <a href="#">Puppy 3</a>
                </li>
            </ul>
        </Layout>
    );
};

export default PuppiesPage;
