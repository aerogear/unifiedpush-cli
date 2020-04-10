# UnifiedPush Client CLI

![Build](https://github.com/aerogear/unifiedpush-cli/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/aerogear/unifiedpush-cli/badge.svg)](https://coveralls.io/github/aerogear/unifiedpush-cli)

The UnifiedPush Client CLI makes it easy to interact with the UnifiedPush Server from the command line.

**NOTE**: it is still in alpha version and, although it works, it still lacks many features. However, if you still want to 
try this tool or help with the development, you are welcome

## Prerequisites

To run the UnifiedPush Client you will need to have [node](https://nodejs.org/) installed.

## Installing 

Run 
```bash
npm install -g @aerogear/unifiedpush-cli
```

That will install the latest version of the _UnifiedPush Client CLI_ in your machine.
When the installation will end, you will be able to access the client by running:

```bash
ups
```

Two namespaces are provided:
* **applications**: contains all the commands administering applications
* **variants**: contains all the commands administering varaints

## Applications

By running

```bash
ups applications --help
```

You will get a simple help describing the list of supported commands and options:

```bash
$ ups applications --help

manage the applications

Commands:
  ups applications create  create a new application
  ups applications list    lists the applications

Basic Auth:
  -u, --username  username                                              [string]
  -p, --password  password                                              [string]
  --auth-type     The type of authentication
                      [string] [choices: "basic", "keycloak"] [default: "basic"]

Keycloak Auth:
  -u, --username  username                                              [string]
  -p, --password  password                                              [string]
  -k, --kc-url    URL of the keycloak server                            [string]
  --realm         The authentication realm used for keycloak authentication
                                                  [string] [default: "aerogear"]
  --client-id     Client id to be used to authenticate with keycloak
                                    [string] [default: "unified-push-server-js"]
  --auth-type     The type of authentication
                      [string] [choices: "basic", "keycloak"] [default: "basic"]

Options:
  -U, --url      URL of the UPS server                       [string] [required]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

With the current version of _UnifiedPush Client CLI_ you will be able to:
* list existing applications
* create existing applications

### Listing applications

To get the list of all the applications managed by a given instance of the _UnifiedPush Server_ the `list` sub-command should be used:

```bash
$ ups -U http://localhost:9999 applications list
╔═════════════════════════╤══════════════════════════════════════╤══════════╗
║ NAME                    │ PUSH-APPLICATION-ID                  │ VARIANTS ║
╟─────────────────────────┼──────────────────────────────────────┼──────────╢
║ AeroGear Playground     │ B868CC08-BCC8-4A0A-B21E-1AC56AF0C734 │ 25       ║
╟─────────────────────────┼──────────────────────────────────────┼──────────╢
║ AeroGear Ionic Showcase │ 954CE9DD-A2BC-443D-B241-205E72F448FB │ 2        ║
╟─────────────────────────┼──────────────────────────────────────┼──────────╢
║ app84                   │ 3a6436ce-2c84-4b17-957b-b004cd3e2385 │ 0        ║
╚═════════════════════════╧══════════════════════════════════════╧══════════╝
```

A filter parameter can be passed to refine the search:

```bash
➜  $ ups -U http://localhost:9999 applications list --filter '{"name":"app84"}'
╔═══════╤══════════════════════════════════════╤══════════╗
║ NAME  │ PUSH-APPLICATION-ID                  │ VARIANTS ║
╟───────┼──────────────────────────────────────┼──────────╢
║ app84 │ 3a6436ce-2c84-4b17-957b-b004cd3e2385 │ 0        ║
╚═══════╧══════════════════════════════════════╧══════════╝
```
More than one key can be specified into the filter.
The list of available keys is:
* **name**
* **developer** : this is assigned automatically by the server based on the logged in user (defaults to 'admin' for non authenticated servers)
* **pushApplicationID** : this ID is assigned by the server when creating a new app

### Creating a new app

To create an application in a given instance of the _UnifiedPush Server_ the `create` sub-command should be used:
```bash
ups -U http://localhost:9999 applications create --name MyTestApp
Application created successfully
╔═══════════╤══════════════════════════════════════╗
║ NAME      │ PUSH-APPLICATION-ID                  ║
╟───────────┼──────────────────────────────────────╢
║ MyTestApp │ ecfe3c76-b547-4b1c-8f21-b08085c08c80 ║
╚═══════════╧══════════════════════════════════════╝
```

The command returns a table with the details of the just created application.

## Variants

By running

```bash
ups variants --help
```

You will get a simple help describing the list of supported commands and options:

```bash
$ ups variants --help
ups variants

manage the variants

Commands:
  ups variants create         create a new variant
  ups variants delete         delete variant(s)
  ups variants list <app-id>  lists the variants for the application identified
                              by <app-id>

Basic Auth:
  -u, --username  username                                              [string]
  -p, --password  password                                              [string]
  --auth-type     The type of authentication
                      [string] [choices: "basic", "keycloak"] [default: "basic"]

Keycloak Auth:
  -u, --username  username                                              [string]
  -p, --password  password                                              [string]
  -k, --kc-url    URL of the keycloak server                            [string]
  --realm         The authentication realm used for keycloak authentication
                                                  [string] [default: "aerogear"]
  --client-id     Client id to be used to authenticate with keycloak
                                    [string] [default: "unified-push-server-js"]
  --auth-type     The type of authentication
                      [string] [choices: "basic", "keycloak"] [default: "basic"]

Options:
  -U, --url      URL of the UPS server                       [string] [required]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

With the current version of _UnifiedPush Client CLI_ you will be able to:
* list existing variants
* create existing variants

### Listing Variants

To get the list of variants for a given application, the `list` sub-command is provided
```bash
ups variants list <app-id> [--filter <filter>]
```

To have the list of variants for the app with id `ecfe3c76-b547-4b1c-8f21-b08085c08c80` we will run:
```bash
ups -U http://localhost:9999 variants list ecfe3c76-b547-4b1c-8f21-b08085c08c80      
╔═════════╤══════════════════════════════════════╤══════════╗
║ NAME    │ VARIANT-ID                           │ TYPE     ║
╟─────────┼──────────────────────────────────────┼──────────╢
║ Android │ 0902F8C3-A882-46B6-B767-88785CDF4089 │ android  ║
╟─────────┼──────────────────────────────────────┼──────────╢
║ WebPush │ CB65A553-F997-4818-B47D-B0754CBD09AB │ web_push ║
╚═════════╧══════════════════════════════════════╧══════════╝
```

A filter can be specified to refine the search. For example, to list only the `android` variants:

```bash
ups -U http://localhost:9999 variants list ecfe3c76-b547-4b1c-8f21-b08085c08c80 --filter '{"type":"android"}'
╔═════════╤══════════════════════════════════════╤═════════╗
║ NAME    │ VARIANT-ID                           │ TYPE    ║
╟─────────┼──────────────────────────────────────┼─────────╢
║ Android │ 0902F8C3-A882-46B6-B767-88785CDF4089 │ android ║
╚═════════╧══════════════════════════════════════╧═════════╝
```

The available keys for filtering are:
* **name**
* **variantID** : assigned by the server when creating a variant, uniquely identifies a single variant
* **developer** : this is assigned automatically by the server based on the logged in user (defaults to 'admin' for non authenticated servers)
* **type** : this can be _android_, _ios_, _ios_token_ or _web_push_

### Creating Variants

Creating a variant involve passing different parameters based on the type of variants you are going to create.
For that reason, and interactive interface is provided so that each required value is requested directly by the CLI.

For example, to create an `android` variant for the application identified by `ecfe3c76-b547-4b1c-8f21-b08085c08c80`:

```bash
ups -U http://localhost:9999 variants create --app-id ecfe3c76-b547-4b1c-8f21-b08085c08c80
? Variant name: MyAndroidVariant
? Type: android
? Server Key: serverkey
? Sender ID: senderid
Variant created
╔══════════════════╤══════════════════════════════════════╤═════════╗
║ NAME             │ VARIANT-ID                           │ TYPE    ║
╟──────────────────┼──────────────────────────────────────┼─────────╢
║ MyAndroidVariant │ 2b100b76-fadb-4403-847d-b649f67de3e3 │ android ║
╚══════════════════╧══════════════════════════════════════╧═════════╝
```

Each or all of the required parameters can be specified on the command line too. If one of them is missing, it will be requested.
For example:
```bash
➜  unifiedpush-cli git:(master) ✗ ups -U http://localhost:9999 variants create --app-id ecfe3c76-b547-4b1c-8f21-b08085c08c80 --def '{"name":"AndroidApp2", "type":"android"}'
? Server Key: serverkey
? Sender ID: sender-id
Variant created
╔═════════════╤══════════════════════════════════════╤═════════╗
║ NAME        │ VARIANT-ID                           │ TYPE    ║
╟─────────────┼──────────────────────────────────────┼─────────╢
║ AndroidApp2 │ f6963832-90c6-4843-b019-9c43a7270a2a │ android ║
╚═════════════╧══════════════════════════════════════╧═════════╝
```

#### Android Variants Properties

* **name**: the variant name
* **type**: must be `android`
* **googleKey**: in the UPS AdminUI this is called `Server Key`
* **projectNumber**: in the UPS AdminUI this is called `Sender ID`

#### iOS Variant Properties

* **name**: the variant name
* **type**: must be `ios`
* **certificate**: path to a P12 file containing the certificate to be used to access the APNS
* **password**: the password of the P12 file
* **production**: `true` or `false`. Whether we are using **production** or **development** APNS.

#### IOS Token Variant Properties

* **name**: the variant name
* **type**: must be `ios_token`
* **teamId**
* **keyId**
* **bundleId**

#### WebPush Variant Properties
* **name**: the variant name
* **type**: must be `web_push`
* **alias**: this must be in **URL** or **mailto** format.

### Deleting variants

To delete a list of variants for a given application, the `delete` sub-command is provided
```bash
ups variants delete --app-id <app-id> [--filter <filter>]
```

For example, to delete all the variants for the app with id `ecfe3c76-b547-4b1c-8f21-b08085c08c80` we will run:
```bash
ups -U http://localhost:9999 variants delete --app-id ecfe3c76-b547-4b1c-8f21-b08085c08c80      
? 2 variant(s) will be deleted. Proceed? Yes
2 variant(s) deleted
```

A filter can be specified to delete a subset of the variants. For example, to delete only the `android` variants:

```bash
ups -U http://localhost:9999 variants delete --app-id ecfe3c76-b547-4b1c-8f21-b08085c08c80  --filter '{"type":"android"}'
? 1 variant(s) will be deleted. Proceed? Yes
1 variant(s) deleted
```

The available keys for filtering are:
* **name**
* **variantID** : assigned by the server when creating a variant, uniquely identifies a single variant
* **developer** : this is assigned automatically by the server based on the logged in user (defaults to 'admin' for non authenticated servers)
* **type** : this can be _android_, _ios_, _ios_token_ or _web_push_

## Authentication
As we can see from the _UnifiedPush Client Admin_ help, we currently supports two kind of authentications:
* Basic
* Keycloak

```bash
$ ups --help
 
ups <command>

Commands:
  ups applications  manage the applications
  ups variants      manage the variants

Basic Auth:
  -u, --username  username                                              [string]
  -p, --password  password                                              [string]
  --auth-type     The type of authentication
                      [string] [choices: "basic", "keycloak"] [default: "basic"]

Keycloak Auth:
  -u, --username  username                                              [string]
  -p, --password  password                                              [string]
  -k, --kc-url    URL of the keycloak server                            [string]
  --realm         The authentication realm used for keycloak authentication
                                                  [string] [default: "aerogear"]
  --client-id     Client id to be used to authenticate with keycloak
                                    [string] [default: "unified-push-server-js"]
  --auth-type     The type of authentication
                      [string] [choices: "basic", "keycloak"] [default: "basic"]

Options:
  -U, --url      URL of the UPS server                       [string] [required]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

### Basic authentication

To perform basic authentication, just pass username, password and auth-type to any command.
For example to list all the applications, instead of

```bash
ups -U http://localhost:9999 applications list
```

you will write

```bash
ups -u username -p password -U http://localhost:9999 applications list
```

### Keycloak authentication

As we have see for the basic authentication, to authenticate with keycloak we just have to add the credentials to the command
and the url of the keycloak server.

For example to list all the applications, instead of

```bash
ups -U http://localhost:9999 applications list
```

you will write

```bash
ups -u username -p password --kc-url http://yourkeycloak --auth-type keycloak -U http://localhost:9999 applications list
```

If you used a different `realm` and/or `client-id`, you will have to specify that also.