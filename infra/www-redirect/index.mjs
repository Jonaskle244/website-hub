// Only the existing, proxied www hostname is routed to this Worker.
const worker = {
  fetch(request) {
    const url = new URL(request.url);
    if (url.hostname !== "www.codemantix.com") {
      return new Response("Not found", { status: 404 });
    }
    url.protocol = "https:";
    url.hostname = "codemantix.com";
    url.port = "";
    return Response.redirect(url.toString(), 301);
  },
};

export default worker;
