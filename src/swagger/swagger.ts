import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
	openapi: "3.0.0",
	info: {
		title: "API Title",
		version: "1.0.0",
		description: "API documentation description",
	},
	paths:{
		"/api/v1/auth/login": {
			post: {
				summary: "İstifadəçi login olur",
				tags: ["Auth"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									email: {
										type: "string",
										example: "user@gmail.com",
									},
									password: {
										type: "string",
										example: "salam1234",
									},
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Uğurlu giriş" },
					401: { description: "Yanlış məlumat" },
				},
			},
		},
		"/api/v1/auth/register": {
			post: {
				summary: "Yeni istifadəçi qeydiyyatı",
				tags: ["Auth"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									full_name: { type: "string" },
									email: { type: "string" },
									password: { type: "string" },
									phone_number: { type: "string" },
									confirm_password: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Qeydiyyat tamamlandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/subcategory/create": {
			post: {
				summary: "Yeni subkateqoriya yarat",
				tags: ["Subcategory"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									name: { type: "string" },
									category_id: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Subkateqoriya yaradıldı" },
					409: { description: "Subkateqoriya artıq mövcuddur" },
				},
			},
		},
		"/api/v1/subcategory/delete/{id}": {
			delete: {
				summary: "Subkateqoriyanı sil",
				tags: ["Subcategory"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək subkateqoriyanın ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Subkateqoriya silindi" },
					404: { description: "Subkateqoriya tapılmadı" },
				},
			},
		},
		"/api/v1/subcategory/get/{id}": {
			get: {
				summary: "ID-yə görə subkateqoriyanı al",
				tags: ["Subcategory"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Alınacaq subkateqoriyanın ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Subkateqoriya tapıldı" },
					404: { description: "Subkateqoriya tapılmadı" },
				},
			},
		},
		"/api/v1/subcategory/update/{id}": {
			put: {
				summary: "Subkateqoriyanı yenilə",
				tags: ["Subcategory"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək subkateqoriyanın ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									name: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Subkateqoriya yeniləndi" },
					404: { description: "Subkateqoriya tapılmadı" },
					409: { description: "Subkateqoriya artıq mövcuddur" },
				},
			},
		},
		"/api/v1/category/create": {
			post: {
				summary: "Yeni kateqoriya yarat",
				tags: ["Category"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									name: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Kateqoriya yaradıldı" },
					409: { description: "Kateqoriya artıq mövcuddur" },
				},
			},
		},
		"/api/v1/category/all": {
			get: {
				summary: "Kateqoriyaları gör",
				tags: ["Category"],
				responses: {
					404: { description: "Kateqoriya tapılmadı" },
				},
			},
		},
		"/api/v1/category/delete/{id}": {
			delete: {
				summary: "Kateqoriyanı sil",
				tags: ["Category"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək kateqoriyanın ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Kateqoriya silindi" },
					404: { description: "Kateqoriya tapılmadı" },
				},
			},
		},
		"/api/v1/product/create": {
			post: {
				summary: "Yeni məhsul yarat",
				tags: ["Məhsul"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
									name: { type: "string" },
									description: { type: "string" },
									price: { type: "number" },
									stock: { type: "integer" },
									subcategory_id: { type: "integer" },
									discounted_price: { type: "number" },
									discounted_percentage: { type: "number" },
									is_top_seller: { type: "boolean" },
									img: {
										type: "string",
										format: "binary",
									},
								},
								required: [
									"name",
									"price",
									"stock",
									"subcategory_id",
								],
							},
						},
					},
				},
				responses: {
					201: {
						description: "Məhsul uğurla yaradıldı",
					},
					422: {
						description: "Validasiya xətası",
					},
				},
			},
		},
    "/api/v1/product/delete/{id}": {
      delete: {
        summary: "Məhsulu sil",
        tags: ["Məhsul"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Silinəcək Məhsulun ID-si",
            schema: {
              type: "string",
              example: "12345"
            },
          },
        ],
        responses: {
          200: { description: "Məhsul silindi" },
          404: { description: "Məhsul tapılmadı" },
        },
      },
    },
    "/api/v1/product/update/{id}": {
			put: {
				summary: "Məhsul yenilə",
				tags: ["Məhsul"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək məhsulun ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
                  name: { type: "string" },
									description: { type: "string" },
									price: { type: "number" },
									stock: { type: "integer" },
									subcategory_id: { type: "integer" },
									discounted_price: { type: "number" },
									discounted_percentage: { type: "number" },
									is_top_seller: { type: "boolean" },
									img: {
										type: "string",
										format: "binary",
									},
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Subkateqoriya yeniləndi" },
					404: { description: "Subkateqoriya tapılmadı" },
					409: { description: "Subkateqoriya artıq mövcuddur" },
				},
			},
		},
    "/api/v1/product/all": {
			get: {
				summary: "Məhsulları gör",
				tags: ["Məhsul"],
				responses: {
					404: { description: "Məhsul tapılmadı" },
				},
			},
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};
