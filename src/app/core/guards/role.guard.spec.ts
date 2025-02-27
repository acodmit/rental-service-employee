import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create spies for AuthService and Router
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    // Inject the guard and dependencies
    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user has the required role', () => {
    // Mock getUserRole to return 'ADMIN'
    authService.getUserRole.and.returnValue('ADMIN');

    // Create a minimal mock ActivatedRouteSnapshot with only the required properties
    const mockRoute = {
      data: { role: 'ADMIN' },
    } as unknown as ActivatedRouteSnapshot; // Cast to ActivatedRouteSnapshot

    const mockState = {} as RouterStateSnapshot;

    // Call canActivate and expect it to return true
    expect(guard.canActivate(mockRoute, mockState)).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to dashboard if user does not have the required role', () => {
    // Mock getUserRole to return 'OPERATOR'
    authService.getUserRole.and.returnValue('OPERATOR');

    // Create a minimal mock ActivatedRouteSnapshot with only the required properties
    const mockRoute = {
      data: { role: 'ADMIN' },
    } as unknown as ActivatedRouteSnapshot; // Cast to ActivatedRouteSnapshot

    const mockState = {} as RouterStateSnapshot;

    // Call canActivate and expect it to return false
    expect(guard.canActivate(mockRoute, mockState)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should allow access if user is a manager (manager has all roles)', () => {
    // Mock getUserRole to return 'MANAGER'
    authService.getUserRole.and.returnValue('MANAGER');

    // Create a minimal mock ActivatedRouteSnapshot with only the required properties
    const mockRoute = {
      data: { role: 'ADMIN' },
    } as unknown as ActivatedRouteSnapshot; // Cast to ActivatedRouteSnapshot

    const mockState = {} as RouterStateSnapshot;

    // Call canActivate and expect it to return true
    expect(guard.canActivate(mockRoute, mockState)).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
