

## Utilisation

### Generation d'une url signée

```sh
curl --location 'https://uf8m8gb2k0.execute-api.eu-central-1.amazonaws.com/epsi/generate-signed-url' \
--header 'x-api-key: <cle api>' \
--header 'Content-Type: application/json' \
--data '{
    "filename": "Tesla-Model-3-2020-06.jpeg"
}'
```

Réponse : 
```sh
{
    "filename": "c914e63b-d276-4ea5-9292-c3339e1ed44e-Tesla-Model-3-2020-06.jpeg",
    "signedUrl": "https://s3-eu-central-1-nro-image-rekognition.s3.eu-central-1.amazonaws.com/c914e63b-d276-4ea5-9292-c3339e1ed44e-Tesla-Model-3-2020-06.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXTZBHJNJ3PS2YVN4%2F20240129%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240129T212900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aDGV1LWNlbnRyYWwtMSJIMEYCIQC2pTC07MKvpRV%2BdUaOdHCee0qyU%2B%2Bt8yBixbVSuna%2BzgIhAM8foLoCse1XcT4Az1eWTicmFQgZ4BO%2BoMEYewn1YXDDKrsDCPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNTIzNTE4ODIzMjUxIgw1jg2g%2F6GRwKvJIp8qjwN3UWzDirq8K5J3nPvhL5rnrGNBWDlaOhWrDJQkxaTfs%2BTPcaB7whmwY4FtAwc66vKBEoStniZvuOspvah%2B8UhhWnuTI%2FlgBobFYSckPyHkiguGjNCuxS5Y%2FUrbR%2BbYKGOHdMHg4ZGa9vvUSAuK4lEUDldDhbg28S3O3YJaLDwP4FRVu1XHGr3Z6I%2F07pYJwCvcAOALZ1mojmM1Ab8y3Lif4nDnjJ%2FC8w5oDgi4a01m0W7sFwwpBUcM65nVRVr5CTbjsxiVImRBaF9PJUp3d9UIzW9Csznv6n7vgcv95ZigTyHZeizE9EILbUVAfHcUIWKytvnjzR4ksZ6fbE98QzXquki2VvNP%2Bl%2FplHmJf%2BPGEz5h2vAloPi4Be3thAXbr4Hwbd95rj8ioazunPEodDA7D82PUgF7rgdpJGSqRVQ18ufNLdTScTsd%2FLCH8S9eJNMIh6LnnvfUudA6LEDpnIfpRNLcJXNQiQuVX6Uav3iAe0bASu9aSiMK6qV7Lbzbc6irQu8qWK%2F9fuznx2CuCTow3qzgrQY6nQHB%2F%2F04%2BECHRFHoPjhRDx0UOuyDLLf%2BY74rR%2FwD7S%2FdADFtoXPjaT92EaqXJqmlGI7AXjWCM8AypGZQsOCJWP4t6i7p29V%2BOJEJtrGurGQ8UCl84NFF7eNF3HmajqxmJLEdSOMgHffOM8NhViu1Vcqu6wgRt0PDSUrYKO3MJQPK5CLA8sTGAZPMzGLCjU16yYjZNGF4%2B1w2QK0Yukfo&X-Amz-Signature=29e8ea3af4802063faa32c423b750324afb6916484443d297ddcf4acf22cf079&X-Amz-SignedHeaders=host"
}
```

|Propriété|Description|
|---------|------------|
|filename | nom du fichier généré par l'application. Ce nom est à conservé car il sera utilisé pour récupérer les détails de l'image
|signedUrl| Url Signée utiliséé pour déposer le fichier 

### Depot du fichier

En utilisation l'url signée, déposer la fichier à analyser.

> L'url doit être appelée avec la méthode PUT

```sh
curl --location --request PUT '<url signée>' \
--header 'Content-Type: image/jpeg' \
--data '@.../images/Tesla-Model-3-2020-06.jpeg'
```


### Récupératioon de la description de l'image

Afin de récupérer la description de l'image, appeler cet url : 

```sh
curl --location 'https://uf8m8gb2k0.execute-api.eu-central-1.amazonaws.com/epsi/detect-labels/c914e63b-d276-4ea5-9292-c3339e1ed44e-Tesla-Model-3-2020-06.jpeg' \
--header 'x-api-key: <clé sécurisée>'
```


Réponse : 

```js
{
    "Labels": [
        {
            "Name": "Car",
            "Confidence": 100,
            "Instances": [
                {
                    "BoundingBox": {
                        "Width": 0.7840660214424133,
                        "Height": 0.5011017322540283,
                        "Left": 0.10225317627191544,
                        "Top": 0.24817031621932983
                    },
                    "Confidence": 99.56523895263672
                }
            ],
            "Parents": [
                {
                    "Name": "Transportation"
                },
                {
                    "Name": "Vehicle"
                }
            ]
        },
        {
            "Name": "Sedan",
            "Confidence": 100,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Car"
                },
                {
                    "Name": "Transportation"
                },
                {
                    "Name": "Vehicle"
                }
            ]
        },
        {
            "Name": "Transportation",
            "Confidence": 100,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Vehicle",
            "Confidence": 100,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Transportation"
                }
            ]
        },
        {
            "Name": "Machine",
            "Confidence": 99.37549591064453,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Wheel",
            "Confidence": 99.37549591064453,
            "Instances": [
                {
                    "BoundingBox": {
                        "Width": 0.12683837115764618,
                        "Height": 0.23687754571437836,
                        "Left": 0.3415278196334839,
                        "Top": 0.5041763782501221
                    },
                    "Confidence": 99.37549591064453
                },
                {
                    "BoundingBox": {
                        "Width": 0.09422130882740021,
                        "Height": 0.1979219615459442,
                        "Left": 0.7667654156684875,
                        "Top": 0.4681364893913269
                    },
                    "Confidence": 98.9002685546875
                }
            ],
            "Parents": [
                {
                    "Name": "Machine"
                }
            ]
        },
        {
            "Name": "Alloy Wheel",
            "Confidence": 86.1035385131836,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Car"
                },
                {
                    "Name": "Car Wheel"
                },
                {
                    "Name": "Machine"
                },
                {
                    "Name": "Spoke"
                },
                {
                    "Name": "Tire"
                },
                {
                    "Name": "Transportation"
                },
                {
                    "Name": "Vehicle"
                },
                {
                    "Name": "Wheel"
                }
            ]
        },
        {
            "Name": "Car Wheel",
            "Confidence": 86.1035385131836,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Car"
                },
                {
                    "Name": "Machine"
                },
                {
                    "Name": "Tire"
                },
                {
                    "Name": "Transportation"
                },
                {
                    "Name": "Vehicle"
                },
                {
                    "Name": "Wheel"
                }
            ]
        },
        {
            "Name": "Spoke",
            "Confidence": 86.1035385131836,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Machine"
                }
            ]
        },
        {
            "Name": "Tire",
            "Confidence": 86.1035385131836,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Jaguar Car",
            "Confidence": 77.94566345214844,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Car"
                },
                {
                    "Name": "Transportation"
                },
                {
                    "Name": "Vehicle"
                }
            ]
        }
    ],
    "LabelModelVersion": "3.0"
}
```