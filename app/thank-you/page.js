import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Thank You!</h2>{" "}
      <p className="text-lg mb-6">Your form has been submitted successfully.</p>{" "}
      <Link 
        href={"/"}
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        {" "}
        Go Back To Form
      </Link>
    </div>
  );
}
