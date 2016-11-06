import * as http from "http";
import * as url from "url";

export namespace Http {
    export function get(urlToGet: string) {
        return new Promise<string>((resolve, reject) => {
            const parsedUrl = url.parse(urlToGet);

            if (!isValidUrl(urlToGet)) return reject("Invalid url");

            http.get({
                host: parsedUrl.host,
                path: parsedUrl.path
            }, response => {
                let body = "";
                response
                    .on("data", d => {
                        body += d;
                    })
                    .on("end", () => {
                        console.log(body)
                        resolve("<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\"><channel><title>Mon site</title><description>Ceci est un exemple de flux RSS 2.0</description><lastBuildDate>Sat, 07 Sep 2002 00:00:01 GMT</lastBuildDate><link>http://www.example.org</link><item><title>Actualité N°1</title><description>Ceci est ma première actualité</description><pubDate>Sat, 07 Sep 2002 00:00:01 GMT</pubDate><link>http://www.example.org/actu1</link></item><item><title>Actualité N°2</title><description>Ceci est ma seconde actualité</description><pubDate>Sat, 07 Sep 2002 00:00:01 GMT</pubDate><link>http://www.example.org/actu2</link></item></channel></rss>");
                    })
                    .on("error", error => {
                        reject("Can't get links content");
                    });
            });
        });
    }
    export function isValidUrl(url: string) {
        var regexp = new RegExp(
            "^" +
            // protocol identifier
            "(?:(?:https?|ftp)://)" +
            // user:pass authentication
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
            // host name
            "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
            "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
            "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
            // TLD may end with dot
            "\\.?" +
            ")" +
            // port number
            "(?::\\d{2,5})?" +
            // resource path
            "(?:[/?#]\\S*)?" +
            "$", "i"
        );
        return regexp.test(url);
    }
}