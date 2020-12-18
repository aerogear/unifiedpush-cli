# UnifiedPush Client CLI

![Build](https://github.com/aerogear/unifiedpush-cli/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/aerogear/unifiedpush-cli/badge.svg?branch=master)](https://coveralls.io/github/aerogear/unifiedpush-cli)

The UnifiedPush Client CLI makes it easy to interact with the UnifiedPush Server from the command line.

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
* **variants**: contains all the commands administering variants

## Applications
### Creating applications
```bash
$ ups applications create --help

create a new application

Create application:
  -U, --url     URL of the UPS server                        [string] [required]
  --name        Name of the application to create            [string] [required]
  --output, -o  The output to be generated
                          [string] [choices: "table", "json"] [default: "table"]


[8X--- CUT]
```

**Example**  
```bash
$ ups applications create -U http://localhost:9999 --name TEST-APPLICATION
Application created successfully

╔══════════════════╤══════════════════════════════════════╗
║ NAME             │ PUSH-APPLICATION-ID                  ║
╟──────────────────┼──────────────────────────────────────╢
║ TEST-APPLICATION │ 5a045786-2be9-410f-9f78-9951fe1441dc ║
╚══════════════════╧══════════════════════════════════════╝
```

If we want a json output:
```bash
$ ups applications create -U http://localhost:9999 --name TEST-APPLICATION-JSON -o json
[{"id":"499e05eb-0829-4eef-a6f6-d20fa4a03e8e","name":"TEST-APPLICATION-JSON","description":null,"pushApplicationID":"e3026570-022f-4e31-a977-ef3df8bce00d","masterSecret":"43024cb7-e8b8-472d-862f-eb97e0f15217","developer":"admin","variants":[]}]
```

### Deleting applications
```bash
$ ups applications delete --help
delete applications

Delete Applications:
  -U, --url      URL of the UPS server                       [string] [required]
  --name         Deletes all the applications with a given name         [string]
  --app-id       Deletes the application identified by the given id      [string]
  --description  Deletes all the applications matching the given description
                                                                        [string]
  --developer    Deletes all the applications matching the given developer
                                                                        [string]
[8X--- CUT]
```

The `--name`, `--app-id`, `--description`, `--developer` options should be used to filter the list of applications
to be deleted. More than one option can be specified at once.

**Example**
```bash
$ ups applications delete -U http://localhost:9999 --name TEST-APPLICATION-JSON
1 application(s) deleted
```
### Listing applications
```bash
$ ups applications list --help
lists the applications

Applications list:
  -U, --url      URL of the UPS server                       [string] [required]
  --app-id       Returns the application identified by the given id      [string]
  --name         Returns all the applications with a given name         [string]
  --description  Returns all the applications matching the given description
                                                                        [string]
  --developer    Returns all the applications matching the given developer
                                                                        [string]
  --output, -o   The output to be generated
                          [string] [choices: "table", "json"] [default: "table"]

[8X--- CUT]
```

**Example**
```bash
$ ups applications list -U http://localhost:9999
╔══════════════════╤══════════════════════════════════════╤══════════╤═══════════════╤═══════════════╗
║ NAME             │ PUSH-APPLICATION-ID                  │ VARIANTS │ INSTALLATIONS │ SENT-MESSAGES ║
╟──────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ TEST-APPLICATION │ 5a045786-2be9-410f-9f78-9951fe1441dc │ 0        │ 0             │ 0             ║
╚══════════════════╧══════════════════════════════════════╧══════════╧═══════════════╧═══════════════╝
```

The `--name`, `--app-id`, `--description`, `--developer` options should be used to filter the list of applications.
More than one option can be specified at once.

The `--output` can be used to get the result as `json`:

```bash
$ ups applications list -U http://localhost:9999 --output json
[{"id":"c0c2d3d8-6622-4fe6-8447-80b2c4c627b5","name":"TEST-APPLICATION","description":null,"pushApplicationID":"5a045786-2be9-410f-9f78-9951fe1441dc","masterSecret":"9f0277cf-a0ce-45fb-94bc-d71aa0f08149","developer":"admin","variants":[],"metadata":{"activity":0,"deviceCount":0}}]
```
### Renaming applications
```bash
$ ups applications rename --help

rename one application

Rename Application:
  -U, --url     URL of the UPS server                        [string] [required]
  --app-id      The push application ID of the app to be renamed
                                                             [string] [required]
  --name        The new name                                 [string] [required]
  --output, -o  The output to be generated
                          [string] [choices: "table", "json"] [default: "table"]

[8X--- CUT]
```

**Example**
```bash
$ ups applications rename -U http://localhost:9999 --app-id 5a045786-2be9-410f-9f78-9951fe1441dc --name TEST-RENAMED
Application renamed successfully
```

### Importing applications
```bash
$ ups applications import --help
ups applications import

Import a list of applications from a json file together with their variants.
Such file can be the json output of the list command

Import applications:
  --in          Path to the json file containing the applications to be
                imported.                                    [string] [required]
  --output, -o  The output to be generated
                          [string] [choices: "table", "json"] [default: "table"]
[8X--- CUT]
```

**Example**
```bash
$ ups applications import -U http://localhost:9999 --in /tmp/apps.json
12 application(s) imported
$ ups applications list -U http://localhost:9999
╔════════════════╤══════════════════════════════════════╤══════════╤═══════════════╤═══════════════╗
║ NAME           │ PUSH-APPLICATION-ID                  │ VARIANTS │ INSTALLATIONS │ SENT-MESSAGES ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP1  │ 8e96fa60-8833-4c1c-973a-b138a09b936b │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP10 │ 98632235-3f88-4ed4-91ac-e829153e58f4 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP11 │ d0238581-8d43-4512-acda-c8caa35f6854 │ 4        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP12 │ 6b9d31cc-b375-4d62-b61f-5f51a9ea72bb │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP2  │ f1d0dabe-acb9-4e4c-89c2-7505df23d0c0 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP3  │ 502e1881-4abe-489e-973a-b7503b636ee8 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP4  │ 2eedc08c-51df-4fae-a6be-966f7cd23f29 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP5  │ f2b80384-a452-4abc-950f-8a12ca3ac300 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP6  │ 6f8f8957-5953-4a32-972f-40e8bd51e32f │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP7  │ 714867dc-6391-4d3c-8512-4187032539a1 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP8  │ 4fdc0fd9-e4cb-40d9-b012-588e06525281 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ IMPORTED-APP9  │ 17013f9f-fc7f-4395-ba2f-ae0486d3aec2 │ 0        │ 0             │ 0             ║
╟────────────────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ TEST-RENAMED   │ 5a045786-2be9-410f-9f78-9951fe1441dc │ 0        │ 0             │ 0             ║
╚════════════════╧══════════════════════════════════════╧══════════╧═══════════════╧═══════════════╝
```
## Variants
### Creating variants
The create command, provides 3 different subcommands to be used to create `android`, `ios`, `ios_token` and `web_push`
variants.
```bash
$ ups variants create --help
create a new variant

Commands:
  ups variants create android    Create a new android variant
  ups variants create ios-cert   Create a new iOS variant (certificate)
  ups variants create ios-token  Create a new ios token variant. For details
                                 see:
                                 https://aerogear.github.io/aerogear-unifiedpush
                                 -server/docs/variants/ios#apns-token-authentica
                                 tion
  ups variants create web-push   Create a new WebPush variant
[8X--- CUT]
```
#### Creating Android variants
```bash
$ ups variants create android --help
Create a new android variant

Create Variant:
  -U, --url         URL of the UPS server                    [string] [required]
  --app-id          Id of the application owning the variant [string] [required]
  --name            The name of the variant to be created    [string] [required]
  --server-key      The google server-key. See https://aerogear.github.io/aeroge
                    ar-unifiedpush-server/docs/variants/android for details
                                                             [string] [required]
  --sender-id       The google sender-id. See https://aerogear.github.io/aerogea
                    r-unifiedpush-server/docs/variants/android for details
                                                             [string] [required]
  --secret          The variant secret. This is useful if you are migrating a
                    variant from one server to another. If not specified, it
                    will be autogenerated                               [string]
  --description     The variant description                             [string]
  --output, -o, -o  The output to be generated
         [string] [choices: "table", "json", "table", "json"] [default: "table"]
[8X--- CUT]
```

**Example**
```bash
$ ups variants create android -U http://localhost:9999 \
    --app-id 5a045786-2be9-410f-9f78-9951fe1441dc \
    --name ANDROID-VARIANT \
    --server-key 'GOOGLE-KEY' \
    --sender-id 'G-SENDER-ID'

Variant created

╔═════════════════╤══════════════════════════════════════╤═════════╗
║ NAME            │ VARIANT-ID                           │ TYPE    ║
╟─────────────────┼──────────────────────────────────────┼─────────╢
║ ANDROID-VARIANT │ 5f18d710-c032-4512-9e69-18c761f6bee6 │ android ║
╚═════════════════╧══════════════════════════════════════╧═════════╝
```

Again, the output parameter can be specified to have a `json` output:
```bash
$ ups variants create android -U http://localhost:9999 \
    --app-id 5a045786-2be9-410f-9f78-9951fe1441dc \
    --name ANDROID-VARIANT-JSON \
    --server-key 'GOOGLE-KEY' \
    --sender-id 'G-SENDER-ID' \
    -o json
[{"id":"d19694e8-4f7a-4d3f-8dfa-c04d3f29fc59","name":"ANDROID-VARIANT-JSON","description":null,"variantID":"2ea0aa61-5ee4-4571-bc98-cd2354e8cdfb","secret":"d08a51c1-1cff-4eaf-9d83-840f1a2a6d78","developer":"admin","googleKey":"GOOGLE-KEY","projectNumber":"G-SENDER-ID","type":"android"}]
```
#### Creating ios-cert variants
```bash
$ ups variants create ios-cert --help
Create a new iOS variant (certificate)

Create Variant:
  -U, --url         URL of the UPS server                    [string] [required]
  --app-id          Id of the application owning the variant [string] [required]
  --name            The name of the variant to be created    [string] [required]
  --certificate     The path to the ".p12" file containing the Apple certificate
                                                             [string] [required]
  --passphrase      The passphrase to be used to access the certificate
                                                             [string] [required]
  --production      Must be specified to create a production variant   [boolean]
  --secret          The variant secret. This is useful if you are migrating a
                    variant from one server to another. If not specified, it
                    will be autogenerated                               [string]
  --description     The variant description                             [string]
  --output, -o, -o  The output to be generated
         [string] [choices: "table", "json", "table", "json"] [default: "table"]
[8X--- CUT]
```

**Example**
```bash
$ ups variants create ios-cert \
    -U http://localhost:9999 \
    --app-id 5a045786-2be9-410f-9f78-9951fe1441dc \
    --name IOS-CERT-VARIANT \
    --certificate /tmp/devel.pem \
    --passphrase certpwd
Variant created

╔══════════════════╤══════════════════════════════════════╤══════╗
║ NAME             │ VARIANT-ID                           │ TYPE ║
╟──────────────────┼──────────────────────────────────────┼──────╢
║ IOS-CERT-VARIANT │ 2cd11dbe-c8fb-483f-bcee-4122a240ab8a │ ios  ║
╚══════════════════╧══════════════════════════════════════╧══════╝
```
#### Creating ios-token variants
```bash
$ ups variants create ios-token --help
Create a new ios token variant. For details see:
https://aerogear.github.io/aerogear-unifiedpush-server/docs/variants/ios#apns-to
ken-authentication

Create Variant:
  -U, --url         URL of the UPS server                    [string] [required]
  --app-id          Id of the application owning the variant [string] [required]
  --name            The name of the variant to be created    [string] [required]
  --bundle-id       The variant bundle-id (for example
                    org.aerogear.PushHelloWorld)             [string] [required]
  --team-id         The variant team-id                      [string] [required]
  --key-id          The variant key-id                       [string] [required]
  --private-key     The variant private key as downloaded from the apple website
                                                             [string] [required]
  --secret          The variant secret. This is useful if you are migrating a
                    variant from one server to another. If not specified, it
                    will be autogenerated                               [string]
  --description     The variant description                             [string]
  --output, -o, -o  The output to be generated
         [string] [choices: "table", "json", "table", "json"] [default: "table"]
[8X--- CUT]
```

**Example**
```bash
$ ups variants create ios-token \
    -U http://localhost:9999 \
    --app-id 5a045786-2be9-410f-9f78-9951fe1441dc \
    --name IOS-TOKEN-VARIANT \
    --bundle-id 'org.aerogear.test' \
    --team-id '0123456789' \
    --key-id 0123456789 \
    --private-key /tmp/privateKey.pem
Variant created

╔═══════════════════╤══════════════════════════════════════╤═══════════╗
║ NAME              │ VARIANT-ID                           │ TYPE      ║
╟───────────────────┼──────────────────────────────────────┼───────────╢
║ IOS-TOKEN-VARIANT │ 77bb4e93-33ab-49b0-b700-e4d43cc16e9a │ ios_token ║
╚═══════════════════╧══════════════════════════════════════╧═══════════╝
```
#### Creating web-push variants
```bash
$ ups variants create web-push --help
Create a new WebPush variant

Create Variant:
  -U, --url         URL of the UPS server                    [string] [required]
  --app-id          Id of the application owning the variant [string] [required]
  --name            The name of the variant to be created    [string] [required]
  --alias           The application server contact information (this must be a
                    mailto or an https url)                  [string] [required]
  --output, -o, -o  The output to be generated
         [string] [choices: "table", "json", "table", "json"] [default: "table"]
[8X--- CUT]
```

**Example**
```bash
$ ups variants create web-push \
    -U http://localhost:9999 \
    --app-id 5a045786-2be9-410f-9f78-9951fe1441dc \
    --name WEBPUSH-VARIANT \
    --alias 'mailto:test@aerogear.com'
Variant created

╔═════════════════╤══════════════════════════════════════╤══════════╗
║ NAME            │ VARIANT-ID                           │ TYPE     ║
╟─────────────────┼──────────────────────────────────────┼──────────╢
║ WEBPUSH-VARIANT │ 9e5125aa-bdde-4dfb-ac48-0c68379eab74 │ web_push ║
╚═════════════════╧══════════════════════════════════════╧══════════╝
```
### Deleting variants
```bash
$ ups variants delete --help
Delete Variants:
  --app-id      The application id                           [string] [required]
  --variant-id  Deletes the variant identified by the specified id      [string]
  --name        Deletes all the variants matching the specified name    [string]
  --developer   Deletes all the variants matching the specified developer
                                                                        [string]
  --type        Deletes all the variants of the specified type          [string]
[8X--- CUT]
```
> :warning: If you don't specify any filter, the command will delete all the application variants!  

**Example**
```bash
$ ups variants delete \
    -U http://localhost:9999 \
    --app-id 5a045786-2be9-410f-9f78-9951fe1441dc \ 
    --variant-id 9e5125aa-bdde-4dfb-ac48-0c68379eab74
1 variant(s) deleted
```
### Listing variants
```bash
lists the variants for the application identified by <app-id>

List variants:
  -U, --url         URL of the UPS server                    [string] [required]
  --app-id          The application id                       [string] [required]
  --variant-id      The variant id                                      [string]
  --type            Returns all the variants of the specified type      [string]
  --name            Returns all the variants matching the specified name[string]
  --developer       Returns all the variants matching the specified developer
                                                                        [string]
  --output, -o, -o  The output to be generated
         [string] [choices: "table", "json", "table", "json"] [default: "table"]

[8X--- CUT]
```
**Example**
```bash
$ ups variants list -U http://localhost:9999 --app-id 5a045786-2be9-410f-9f78-9951fe1441dc
╔══════════════════════╤══════════════════════════════════════╤═══════════╗
║ NAME                 │ VARIANT-ID                           │ TYPE      ║
╟──────────────────────┼──────────────────────────────────────┼───────────╢
║ ANDROID-VARIANT      │ 5f18d710-c032-4512-9e69-18c761f6bee6 │ android   ║
╟──────────────────────┼──────────────────────────────────────┼───────────╢
║ ANDROID-VARIANT-JSON │ 2ea0aa61-5ee4-4571-bc98-cd2354e8cdfb │ android   ║
╟──────────────────────┼──────────────────────────────────────┼───────────╢
║ IOS-CERT-VARIANT     │ 2cd11dbe-c8fb-483f-bcee-4122a240ab8a │ ios       ║
╟──────────────────────┼──────────────────────────────────────┼───────────╢
║ IOS-TOKEN-VARIANT    │ 77bb4e93-33ab-49b0-b700-e4d43cc16e9a │ ios_token ║
╚══════════════════════╧══════════════════════════════════════╧═══════════╝
```
## Authentication
We currently support two kind of authentications:
* Basic
* Keycloak

```bash
$ ups --help
ups --url <url> [auth] <command>

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

[8X--- CUT]
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
Similarly to what we have seen about basic authentication, to authenticate with keycloak we just have to add the 
credentials to the command and the url of the keycloak server.

For example to list all the applications, instead of

```bash
ups -U http://localhost:9999 applications list
```
you will have to write
```bash
ups -u username -p password --kc-url http://yourkeycloak --auth-type keycloak -U http://localhost:9999 applications list
```

If you used a different `realm` and/or `client-id`, you will have to specify that also (`--realm` and `--client-id` 
options).
