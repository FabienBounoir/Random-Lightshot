/**
 * @type {import("@sveltejs/kit").Handle}
 */
export const handle = ({ resolve, event }) =>
resolve(event, {
    ssr: false
});
