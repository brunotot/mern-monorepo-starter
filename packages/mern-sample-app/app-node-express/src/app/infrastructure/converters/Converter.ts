export abstract class Converter<DOMAIN, FORM, DTO> {
  abstract formToDomain(form: FORM): Promise<DOMAIN>;

  abstract domainToForm(domain: DOMAIN): Promise<FORM>;

  abstract domainToDto(domain: DOMAIN): Promise<DTO>;

  public async formToDomainList(forms: FORM[]): Promise<DOMAIN[]> {
    return await Promise.all(forms.map(form => this.formToDomain(form)));
  }

  public async domainToFormList(domains: DOMAIN[]): Promise<FORM[]> {
    return await Promise.all(domains.map(domain => this.domainToForm(domain)));
  }

  public async domainToDtoList(domains: DOMAIN[]): Promise<DTO[]> {
    return await Promise.all(domains.map(domain => this.domainToDto(domain)));
  }
}
