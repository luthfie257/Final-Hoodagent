import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-20 lg:px-32">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Hood Agent Logo"
                className="h-16 md:h-20 w-auto object-contain mb-6 cursor-pointer"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Hood Agent is a platform connecting communities with
              opportunities. We believe everyone deserves access to information,
              events, and opportunities that help them grow.
            </p>
            <div className="flex gap-4">
              <a
                href="http://shopee.co.id/hoodagent_"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABEElEQVR4AeyV4RHCIAyF1Ul0E51EnUSdRDfRTdpN8Hs56AlSqK3e+aO9vJCQkAfR0tXix89/EDjntuAOJA3qCrZDDl89AYUOFLqDUHCNbXPEzthFKRJQQEWvvsJlyYO9ARcgOfkc2VkUCVixBxIVt93C0QLZRwXACfRKjUAn0OKbVIKH99Uyb74PNQJbzI7bdOnLnOWk8eBHBPQz/FMwnQtJ5mRUT7wJ8xojAiZCSzBHS3SilMCqcnwTc1DmZBQhkxAyJ1FZgiRnklskKO1MrLW4cooESpiKmaDawblFH7fIbsjMtTNoyrNZDW8v0t9AH5IoISQOHHXrqkaXHhHwZj7ADoyVDQujDUYEHe0XjScAAAD//89uo00AAAAGSURBVAMA4wGlMfHEpxkAAAAASUVORK5CYII=" />
              </a>
              <a
                href="http://wa.me/message/IONCXXUB3M4DF1"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB/UlEQVR4AeSU0XXCMAxF0y5SmKRlksIkwCTQSaCTAJPQe0VsbCcpHz18NceKFflJT5LtvHZPfv4BwfV6nSEb5IA4TrzUd8zLRx3+tUUE2BDghKyRGbJHjojD4JKI8XtURgkIbNYp8Pbl9syZVr0siDZHtsgavFVJyGc9RgmA7BDHgoCjGWI/I65JJFYiq1TPMiAgG50+QJjtke+BE2t5QHLmw4rE2Uo+76Mi6IMJ2uOYem35tuvu1WhgJVlhXhLD5FBvoyLAlBbtbQc49dU9SWvARkdKqMK1BO+69hmpmpnzQ+l9JIkYyaElkN2jmNYzAQF0Tvap+ZsF94LpNloCrRlAUAnsre1KJ0vMlLyxkP3Ru5bAgNqzQGJF7okbGCTsjXvibfbEZSxK24EBQZRoAMDlKEk8UYrBPPtB2oPN/tLrMbUVGEiQRzUAvqiivFRllepfYkgqVVPtVUVgIMA6mR1qPVxHvFTeXm+5vw8vo3iTKu9POFcEYek6K6iy6JoHEisKDJmLt03a4kCU8IoAcLpYF3R/0UkMUvp5qtxo2+J+uDYIrrEiwJAuieUqn9icPTFK/J4hP2A3sGu2JVqFbTBaAjO1dI9l9BgP+x0biW6vJXWfxBh4NHOwMSoCemtQZYMuUcdsb/3WbkDFP602iSLQ1KsimAL9xf50gh8AAAD//wTlNwUAAAAGSURBVAMADOfhMUai0GQAAAAASUVORK5CYII=" />
              </a>
              <a
                href="http://www.instagram.com/hoodagent_bhapri/"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB8UlEQVR4AdyUTVICMRCFB4/g3hJOomy9gyXcwxI4CXgCly7hJIJLTzF+X5wMmcxfWRYbqbxJ09P9XqeTyVVx4d8/FSjLcgrWYA+GxpGXYss87ep2q0UELgg8ghUwacfchwPvTsAci1ljN0ZDAHIJt0QcJj+/GdNyBHPiZ8DxBMe9RkRDAKdVMxVLH2OA7BF8EPcGFLLAyIGrKHIB1a3eZYeA+IBoAdwX+21LfPXFw+qvWaU5tgzXeeQCVmBgHQGpG77HYeusTnJF3Kcb/A/gBcQhR7RbK6hfJIbErmxDlRP8VrxhlugZ3zt45b/D4vRrB+QrCM74oHqrjeThhEB2Atruk6vzfUxpzV0Cn0nUXWV7TCuznmK/fy1QM2CkYvw9D1ZhO86OHqtrBWlorNJWpf6C9tkmfYNCXQK3ZlUwWRE/oEAIsX3X9kR5pLvaV6UXw6eoaoObqdAK8pJMj6fk+nyHq3/kK7DaxjFLRCSzWo+o14fXiCIpuxsuR+3LBUywBS0RhHZA4jWzQjWJBqszR8ihKyAXsDqDvBmdQ9DYoyL3gzQ0fnTazT2gMtVtheSKxLveq6EPXiPui+1xhYMtKhBx+V4HBiroER2CxZgzr3JD5fGRtyj4CfQ6sBqT+Ds43GxjLSjkp49OgTTgr/bFBb4BAAD//0KWvSEAAAAGSURBVAMAn1D4MbJG36MAAAAASUVORK5CYII=" />
              </a>
              <a
                href="http://vm.tiktok.com/ZM284QrUd"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABW0lEQVR4AcyUi3HCQAxE41QClSTphFSCqQSoBDqBTsw+jzGS7mMPmBk8ku8n7Up3uvv+evP3eQRd1+27x3eZ2oBXM1iJa1UjeZUA7C2/ki5BsFEW7TsJwN6K5CSFzG3ZEhlAgP7qt5e6LVuSQNipVAmUMlXSqqU0iTAiXDWxlu6k9NV4yRIIEGBqHCXljdzc3mrcS9M0V2krhWit9r9fGH4JgcCJFOAs4OCXbQSeZJEQyJODUuMkcXSrlYEjUPRxK86KCiH1QwWnuOQIZPUjHUXIf+PgyU4ksPv+VMQxjkhg1zlsO7737fz5PllqI8HRGFKq7o3RGTG2WRrzfDcSxIh4Y7hkKKXLnbBIXDA7TvqOQIdKObqLIg8qC42R7wZ7mZTFEWAmJw53KjLA2S5cqpoQYC0SnLn6EJEV07SMuROsMzepWQK8RDK+MeojPbA6EGEyS4sEs7xnGN0AAAD//52t8gAAAAAGSURBVAMAGF9uMe6PO4AAAAAASUVORK5CYII=" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#story"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/#catalog"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/#event"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/#divisi"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Divisions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACBklEQVR4AcTU4VUbMRAEYCWNxFQSqASoxKYSSCU4lUAnl/nE7T3DyT7/ycPv5rRa7c6sVtb9bP/59/0C0zTtgkPwGnje8noO+HZbDbi4AyQheAv2wW3gQfoQg4/oIfbZ56xAyF+ThSRDe8rr7kd+GW+Cx4CP2H6OjWv9DAWSoEIVvycF8SHcx9gt43vwEqicmJjb5JgL+YSVQAJV9TxHPYboyBfoe4apzmCXNeR2I/x+miZFsResBLKi+gxNlZ28teYcyq8Atv4TsbOXxPBfJfArwZ6/XkGdAyItATbC2umfxHl+e51itIOqAonYmj9pCcRZbSGSadOqll/NY348I4FV0Efop3fF9HEWFdDnjMJIoCqv4Kpu7xAD/mqb3rf4nAnOymV3jAT6Ql7VmmqHubvhwNmE3YWEtuo9n/mCkUAl3Yuat+9g+RGAf9jNvCaMoLEOm90xEkBgq/0bJApR4LIhhdqV9rhg2uYCypOyYCUQIgJVicsjeUk4NdJ7a3Uei+hpzErAYkQcnmoQ6Dv3CHUPjskRv4oZCsxRKrIbrSqiealpDWG915q7ZeGLcVYgFSGvxIe0Q697emyCyM0VYhzirIDoWcQ/yHSPOFB5/e99aYetkQAXBQR8EUGs8r67rF0kl78pIChECO0EIbt/xq1t4SoBJEQCLXEPCHFv4mqBTaYzAf8AAAD//3M4UgYAAAAGSURBVAMACNzPMer5RG4AAAAASUVORK5CYII=" />
                <span>Garut, Jawa Barat Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABQ0lEQVR4AeyTARLBMBBFw0m4CUdxknISbsJNuEm9l2mi0pbSYcYMs7/ZTXb/TzYxDx/+/QWeNji3qK7rFTiDqSbHKilnASYqsABTTY59ImkLJNXl7M0fpEugKeIY2gJxgs+RHm0ZXzJq3OC5LOoTUL2iYLRIk3ssyY37BHYuAEW8MAUJuwbxAkjs/ZmQavUjOgK0353bywsZktsyj094M4idsyWO5q6b2lsSXkeAuUBiLMA/AEX2ECpMGELju3PjE/k+jJNBiV4BkyhSxCMLRWzZFnKJK3PAjrw146ANClhB8QW4840xkNiW4IbelrjQxkOBlIiIrfJebIMnk1w/pQyOowSsRsTTSDzYb/NKjBYoC8fGXxWIPeWVTLLmZJFLv30Cn2NecPFN+AjkiuVZgEv0D+Ml4k6yu0eQBaLcBz6/L3AFAAD//wMCA3wAAAAGSURBVAMAcy7iMcCtnqIAAAAASUVORK5CYII=" />
                <a
                  href="mailto:hello@hoodagent.com"
                  className="hover:text-[#FFAE00] transition-colors duration-300"
                >
                  hello@hoodagent.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB/UlEQVR4AeSU0XXCMAxF0y5SmKRlksIkwCTQSaCTAJPQe0VsbCcpHz18NceKFflJT5LtvHZPfv4BwfV6nSEb5IA4TrzUd8zLRx3+tUUE2BDghKyRGbJHjojD4JKI8XtURgkIbNYp8Pbl9syZVr0siDZHtsgavFVJyGc9RgmA7BDHgoCjGWI/I65JJFYiq1TPMiAgG50+QJjtke+BE2t5QHLmw4rE2Uo+76Mi6IMJ2uOYem35tuvu1WhgJVlhXhLD5FBvoyLAlBbtbQc49dU9SWvARkdKqMK1BO+69hmpmpnzQ+l9JIkYyaElkN2jmNYzAQF0Tvap+ZsF94LpNloCrRlAUAnsre1KJ0vMlLyxkP3Ru5bAgNqzQGJF7okbGCTsjXvibfbEZSxK24EBQZRoAMDlKEk8UYrBPPtB2oPN/tLrMbUVGEiQRzUAvqiivFRllepfYkgqVVPtVUVgIMA6mR1qPVxHvFTeXm+5vw8vo3iTKu9POFcEYek6K6iy6JoHEisKDJmLt03a4kCU8IoAcLpYF3R/0UkMUvp5qtxo2+J+uDYIrrEiwJAuieUqn9icPTFK/J4hP2A3sGu2JVqFbTBaAjO1dI9l9BgP+x0biW6vJXWfxBh4NHOwMSoCemtQZYMuUcdsb/3WbkDFP602iSLQ1KsimAL9xf50gh8AAAD//wTlNwUAAAAGSURBVAMADOfhMUai0GQAAAAASUVORK5CYII=" />
                <a
                  href="http://wa.me/message/IONCXXUB3M4DF1"
                  className="hover:text-[#FFAE00] transition-colors duration-300"
                >
                  +62 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#CB3B0F] transition-colors duration-300"
              />
              <button className="bg-[#CB3B0F] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; 2025 Hood Agent. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-[#FFAE00] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#FFAE00] transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-[#FFAE00] transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
