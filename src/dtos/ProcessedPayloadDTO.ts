import { UnauthorizedException } from '@nestjs/common'

export class ProcessedPayloadDTO<R = Array<string>, P = Array<string>> {
  id: string
  validationToken: string
  externalId: string
  identity: string
  roles: Array<R>
  permissionCodenames: Array<P>

  userHasPermissions(requestedPermissions: Array<P>) {
    if (!requestedPermissions.every((it) => this.permissionCodenames.includes(it)))
      throw new UnauthorizedException('User does not have enough permissions to perform such operation')
  }

  static newInstaceBasedOnRequest(processedPayloadDTO?: ProcessedPayloadDTO): ProcessedPayloadDTO | undefined {
    if (!processedPayloadDTO) return undefined
    const { id, validationToken, externalId, identity, permissionCodenames, roles } = processedPayloadDTO
    return new ProcessedPayloadDTO(id, validationToken, externalId, identity, permissionCodenames, roles)
  }

  static matchesObject(data: Object): boolean {
    if (!data) return false
    const keys = Object.keys(data)
    if (!keys.includes('id') || !keys.includes('validationToken') || !keys.includes('permissionCodenames')) return false
    return true
  }

  protected constructor(id: string, validationToken: string, externalId: string, identity: string, permissionsCodenames: Array<P>, roles: Array<R>) {
    this.id = id
    this.validationToken = validationToken
    this.externalId = externalId
    this.identity = identity
    this.permissionCodenames = permissionsCodenames
    this.roles = roles
  }
}
