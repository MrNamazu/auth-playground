// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: {
			email: string,
			fftoken: string,
			ffchar: string,
			ffid: string,
		}
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	interface Session {
		user?: {
			email: string,
			fftoken: string,
			ffchar: string,
			ffid: string,
		}
	}
	// interface Stuff {}
}
