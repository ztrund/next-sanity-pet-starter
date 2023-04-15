import Layout from "../components/layout";

const ContactPage = () => {
    return (
        <Layout pageTitle="Contact Us">
            <div className="container mx-auto p-4 bg-light-shades drop-shadow-lg rounded-lg max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
                <p className="text-center mb-12">Feel free to reach out to us through the following channels:</p>

                {/* Additional contact information */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Other ways to reach us:</h2>
                    <p>
                        <strong>Email:</strong> info@example.com
                    </p>
                    <p>
                        <strong>Phone:</strong> +1 (123) 456-7890
                    </p>
                    <p>
                        <strong>Address:</strong> 123 Main St, Suite 200, Anytown, USA
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Follow us on social media:</h2>
                    <p>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-blue-600">
                            Facebook
                        </a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-blue-500">
                            Twitter
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-pink-500">
                            Instagram
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                            LinkedIn
                        </a>
                    </p>
                </div>

                {/* Business Hours */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Business Hours:</h2>
                    <p>
                        <strong>Monday - Friday:</strong> 9:00am - 5:00pm
                    </p>
                    <p>
                        <strong>Saturday:</strong> 10:00am - 2:00pm
                    </p>
                    <p>
                        <strong>Sunday:</strong> Closed
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default ContactPage;
