import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ProviderEnum } from 'src/core/enums/provider.enum'

export type UserDocument = User & Document

@Schema()
export class User extends Document {
	@Prop({ required: false, toString: true, default: null })
	providerSaveId: string

	@Prop({ required: false, toString: true, default: null })
	firstName: string

	@Prop({ required: false, toString: true, default: null })
	lastName: string

	@Prop({ required: false, toString: true, default: null })
	userName: string

	@Prop({ required: true, toString: true })
	email: string

	@Prop({ required: false, toString: true, default: null })
	avatar: string

	@Prop({ required: false, toString: true, default: null })
	createdAt: Date

	@Prop({ required: false, toString: true, default: null })
	updatedAt: Date

	@Prop({ required: false, toString: true, default: null })
	accessToken: string

	@Prop({
		required: true,
		toString: true,
		enum: Object.values(ProviderEnum),
		validate: {
			validator: (v: ProviderEnum) => Object.values(ProviderEnum).includes(v),
			message: (props: { value: ProviderEnum }) =>
				`${props.value} is not a valid provider!`,
		},
	})
	provider: string
}

export const UserSchema = SchemaFactory.createForClass(User)
