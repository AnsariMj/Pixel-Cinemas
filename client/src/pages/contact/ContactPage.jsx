import React from "react";
const ContactPage = () => {


  const handleSubmit = async (e) => {
    e.preventDefault();
    // emailjs.send(
    //   serviceId,
    //   templeteId,
    //   {
    //     from_name: formData.name,
    //     to_name: "Janesh Timilsena",
    //     from_email: formData.email,
    //     to_email: "janeshtimilsena963@gmail.com",
    //     message: formData.details,
    //     number: formData.phone,

    //   }
    // )
  }

  const mapSrc = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3520.5804422446654!2d81.6264739!3d28.0678325!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12baeca0a8e97ed%3A0xd84434c779e6d1d4!2sBanke%20Bageshwori%20Campus%2C%20Nepalgunj!5e0!3m2!1sen!2snp!4v1710956559941!5m2!1sen!2snp" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'

  return (

    <>
      <h3 class="font-bold text-white mt-20 text-center text-3xl mb-12">Contact us</h3>
      <div class=" flex flex-wrap my-12 py-12  items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px]">

          <div class="bg-teal-900 px-6 py-6 rounded shadow-md text-white w-full">
            <form action="" onSubmit={handleSubmit}>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@domain.com"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="number"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder=" Contact Number"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="subject"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Enter your subject"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="message"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  id="message"
                  placeholder="Type your message"
                  class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>
              <div>
                <button
                  class="hover:shadow-form rounded-md bg-teal-700 py-3 px-8 text-base font-semibold text-white outline-none"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>


        <div class="flex-initial text-center shrink w-full md:w-3/12 md:pl-3">
          <ul>
            <li>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" class="w-5 mx-auto  text-teal-600 mb-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
              </svg>
              <p class="mb-6  text-white"><small>Nepalgunj</small></p>
            </li>
            <li>
              <i class="fas fa-phone fa-2x text-blue-600"></i>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" class="w-6 mx-auto text-teal-600 mb-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
              </svg>
              <p class="mb-6  text-white"><small>+977-9815598650</small></p>
            </li>
            <li>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="w-6 mx-auto text-teal-600 mb-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
              </svg>
              <p class="mb-6  text-white"><small>ansarimj14@gmail.com</small></p>
            </li>
          </ul>
        </div>

        <div className="container  px-10  py-10 mx-20">
          <iframe
            title="Google Maps"
            src={mapSrc}
            height={600}
            width={"100%"}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
